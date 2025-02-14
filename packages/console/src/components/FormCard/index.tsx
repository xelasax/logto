import type { AdminConsoleKey } from '@logto/phrases';
import type { ReactNode } from 'react';

import DynamicT from '@/ds-components/DynamicT';
import type { Props as TextLinkProps } from '@/ds-components/TextLink';

import LearnMore from '../LearnMore';

import FormCardLayout from './FormCardLayout';
import styles from './index.module.scss';

export type Props = {
  readonly title: AdminConsoleKey;
  readonly tag?: ReactNode;
  readonly description?: AdminConsoleKey;
  readonly descriptionInterpolation?: Record<string, unknown>;
  readonly learnMoreLink?: Pick<TextLinkProps, 'href' | 'targetBlank'> & {
    linkText?: AdminConsoleKey;
    isRelativeDocUrl?: boolean;
  };
  readonly children: ReactNode;
};

function FormCard({
  title,
  tag,
  description,
  descriptionInterpolation,
  learnMoreLink,
  children,
}: Props) {
  return (
    <FormCardLayout
      introduction={
        <>
          <div className={styles.title}>
            <DynamicT forKey={title} />
            {tag}
          </div>
          {description && (
            <div className={styles.description}>
              <DynamicT forKey={description} interpolation={descriptionInterpolation} />
              {learnMoreLink?.href && (
                <LearnMore
                  href={learnMoreLink.href}
                  targetBlank={learnMoreLink.targetBlank}
                  customI18nKey={learnMoreLink.linkText}
                  isRelativeDocUrl={learnMoreLink.isRelativeDocUrl}
                />
              )}
            </div>
          )}
        </>
      }
    >
      {children}
    </FormCardLayout>
  );
}

export default FormCard;

export { default as FormCardSkeleton } from './Skeleton';
