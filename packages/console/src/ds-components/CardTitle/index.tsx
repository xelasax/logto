import type { AdminConsoleKey } from '@logto/phrases';
import classNames from 'classnames';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { CombinedAddOnAndFeatureTag, type PaywallPlanId } from '@/components/FeatureTag';
import type { Props as TextLinkProps } from '@/ds-components/TextLink';

import type DangerousRaw from '../DangerousRaw';
import DynamicT from '../DynamicT';
import TextLink from '../TextLink';

import styles from './index.module.scss';

export type Props = {
  readonly title: AdminConsoleKey | ReactElement<typeof DangerousRaw>;
  readonly subtitle?: AdminConsoleKey | ReactElement<typeof DangerousRaw>;
  readonly size?: 'small' | 'medium' | 'large';
  readonly learnMoreLink?: Pick<TextLinkProps, 'href' | 'targetBlank'> & {
    linkText?: AdminConsoleKey;
    isRelativeDocUrl?: boolean;
  };
  readonly isWordWrapEnabled?: boolean;
  readonly className?: string;
  /**
   * If a paywall tag should be shown next to the title. The value is the plan type.
   * If not provided, no paywall tag will be shown.
   */
  readonly paywall?: PaywallPlanId;
  readonly hasAddOnTag?: boolean;
};

/**
 * Always use this component to render CardTitle, with built-in i18n support.
 */
function CardTitle({
  title,
  subtitle,
  size = 'large',
  isWordWrapEnabled = false,
  learnMoreLink,
  className,
  paywall,
  hasAddOnTag,
}: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  return (
    <div className={classNames(styles.container, styles[size], className)}>
      <div className={classNames(styles.title, !isWordWrapEnabled && styles.titleEllipsis)}>
        {typeof title === 'string' ? <DynamicT forKey={title} /> : title}
        <CombinedAddOnAndFeatureTag hasAddOnTag={hasAddOnTag} paywall={paywall} />
      </div>
      {Boolean(subtitle ?? learnMoreLink) && (
        <div className={styles.subtitle}>
          {subtitle && (
            <span>{typeof subtitle === 'string' ? <DynamicT forKey={subtitle} /> : subtitle}</span>
          )}
          {learnMoreLink?.href && (
            <>
              {/* Use a space to keep the link and the text separate.
               * Avoid using `margin-inline-start` since it will cause an unexpected gap when the "learn more" text is at the start of a new line
               */}{' '}
              <TextLink href={learnMoreLink.href} targetBlank={learnMoreLink.targetBlank}>
                {t('general.learn_more')}
              </TextLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CardTitle;
