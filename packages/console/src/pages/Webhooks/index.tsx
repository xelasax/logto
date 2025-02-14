import { Theme, type Hook, type HookResponse } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';

import Plus from '@/assets/icons/plus.svg?react';
import WebhookDark from '@/assets/icons/webhook-dark.svg?react';
import Webhook from '@/assets/icons/webhook.svg?react';
import WebhooksEmptyDark from '@/assets/images/webhooks-empty-dark.svg?react';
import WebhooksEmpty from '@/assets/images/webhooks-empty.svg?react';
import ItemPreview from '@/components/ItemPreview';
import PageMeta from '@/components/PageMeta';
import SuccessRate from '@/components/SuccessRate';
import { defaultPageSize, webhooks as webhooksDocumentationLink } from '@/consts';
import Button from '@/ds-components/Button';
import CardTitle from '@/ds-components/CardTitle';
import DynamicT from '@/ds-components/DynamicT';
import Table from '@/ds-components/Table';
import TablePlaceholder from '@/ds-components/Table/TablePlaceholder';
import Tag from '@/ds-components/Tag';
import { type RequestError } from '@/hooks/use-api';
import useSearchParametersWatcher from '@/hooks/use-search-parameters-watcher';
import useTenantPathname from '@/hooks/use-tenant-pathname';
import useTheme from '@/hooks/use-theme';
import pageLayout from '@/scss/page-layout.module.scss';
import { buildUrl } from '@/utils/url';

import CreateFormModal from './CreateFormModal';
import styles from './index.module.scss';

const pageSize = defaultPageSize;
const webhooksPathname = '/webhooks';
const createWebhookPathname = `${webhooksPathname}/create`;

const buildDetailsPathname = (id: string) => `${webhooksPathname}/${id}`;

function Webhooks() {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { search } = useLocation();
  const { navigate, match } = useTenantPathname();
  const [{ page }, updateSearchParameters] = useSearchParametersWatcher({
    page: 1,
  });
  const { data, error, mutate } = useSWR<[HookResponse[], number], RequestError>(
    buildUrl('api/hooks', {
      includeExecutionStats: String(true),
      page: String(page),
      page_size: String(pageSize),
    })
  );
  const isLoading = !data && !error;
  const [webhooks, totalCount] = data ?? [];

  const theme = useTheme();
  const WebhookIcon = theme === Theme.Light ? Webhook : WebhookDark;
  const isCreating = match(createWebhookPathname);

  return (
    <div className={pageLayout.container}>
      <PageMeta titleKey="webhooks.page_title" />
      <div className={pageLayout.headline}>
        <CardTitle
          title="webhooks.title"
          subtitle="webhooks.subtitle"
          learnMoreLink={{ href: webhooksDocumentationLink }}
        />
        <Button
          icon={<Plus />}
          type="primary"
          size="large"
          title="webhooks.create"
          onClick={() => {
            navigate({ pathname: createWebhookPathname, search });
          }}
        />
      </div>
      <Table
        className={pageLayout.table}
        rowGroups={[{ key: 'hooks', data: webhooks }]}
        rowIndexKey="id"
        isLoading={isLoading}
        errorMessage={error?.body?.message ?? error?.message}
        columns={[
          {
            title: <DynamicT forKey="webhooks.table.name" />,
            dataIndex: 'name',
            colSpan: 4,
            render: ({ id, name }) => {
              return (
                <ItemPreview
                  icon={<WebhookIcon className={styles.icon} />}
                  title={name || t('general.unnamed')}
                  to={buildDetailsPathname(id)}
                />
              );
            },
          },
          {
            title: <DynamicT forKey="webhooks.table.events" />,
            dataIndex: 'events',
            colSpan: 7,
            render: ({ event, events }) => {
              const eventArray = conditional(events.length > 0 && events) ?? [event];
              return eventArray.join(' / ');
            },
          },
          {
            title: <DynamicT forKey="webhooks.table.success_rate" />,
            dataIndex: 'successRate',
            colSpan: 3,
            render: ({ enabled, executionStats }) => {
              return enabled ? (
                <SuccessRate isNumberOnly stats={executionStats} />
              ) : (
                <Tag type="state" status="info" variant="plain">
                  <DynamicT forKey="webhook_details.not_in_use" />
                </Tag>
              );
            },
          },
          {
            title: <DynamicT forKey="webhooks.table.requests" />,
            dataIndex: 'Requests',
            colSpan: 2,
            render: ({ enabled, executionStats: { requestCount } }) => {
              return (
                <div className={styles.requests}>
                  {enabled ? requestCount.toLocaleString() : '-'}
                </div>
              );
            },
          },
        ]}
        rowClickHandler={({ id }) => {
          navigate(buildDetailsPathname(id));
        }}
        placeholder={
          <TablePlaceholder
            image={<WebhooksEmpty />}
            imageDark={<WebhooksEmptyDark />}
            title="webhooks.placeholder.title"
            description="webhooks.placeholder.description"
            action={
              <Button
                title="webhooks.placeholder.create_webhook"
                type="primary"
                size="large"
                icon={<Plus />}
                onClick={() => {
                  navigate({ pathname: createWebhookPathname, search });
                }}
              />
            }
          />
        }
        pagination={{
          page,
          totalCount,
          pageSize,
          onChange: (page) => {
            updateSearchParameters({ page });
          },
        }}
      />
      {totalCount !== undefined && (
        <CreateFormModal
          isOpen={isCreating}
          onClose={(createdHook?: Hook) => {
            if (createdHook) {
              void mutate();
              toast.success(t('webhooks.webhook_created', { name: createdHook.name }));
              navigate(buildDetailsPathname(createdHook.id), { replace: true });
              return;
            }

            navigate({ pathname: webhooksPathname, search });
          }}
        />
      )}
    </div>
  );
}

export default Webhooks;
