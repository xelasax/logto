const content = {
  terms_of_use: {
    title: 'TERMS',
    /** UNTRANSLATED */
    description: 'Add Terms and Privacy to meet compliance requirements.',
    terms_of_use: 'Terms of use URL',
    terms_of_use_placeholder: 'https://your.terms.of.use/',
    privacy_policy: 'Privacy policy URL',
    privacy_policy_placeholder: 'https://your.privacy.policy/',
    agree_to_terms: '약관에 동의하기',
    agree_policies: {
      automatic: '자동으로 약관에 계속 동의하기',
      manual_registration_only: '등록 시에만 체크박스 동의 요구',
      manual: '등록 시와 로그인 시 모두 체크박스 동의 요구',
    },
  },
  languages: {
    title: 'LANGUAGES',
    enable_auto_detect: 'Enable auto-detect',
    description:
      "Your software detects the user's locale setting and switches to the local language. You can add new languages by translating UI from English to another language.",
    manage_language: 'Manage language',
    default_language: 'Default language',
    default_language_description_auto:
      'The default language will be used when the detected user language isn’t covered in the current language library.',
    default_language_description_fixed:
      'When auto-detect is off, the default language is the only language your software will show. Turn on auto-detect for language extension.',
  },
  support: {
    title: '지원',
    subtitle: '오류 페이지에 지원 채널을 표시하여 사용자에게 빠른 도움을 제공합니다.',
    support_email: '지원 이메일',
    support_email_placeholder: 'support@email.com',
    support_website: '지원 웹사이트',
    support_website_placeholder: 'https://your.website/support',
  },
  manage_language: {
    title: 'Manage language',
    subtitle:
      'Localize the product experience by adding languages and translations. Your contribution can be set as the default language.',
    add_language: 'Add Language',
    logto_provided: 'Logto provided',
    key: 'Key',
    logto_source_values: 'Logto source values',
    custom_values: 'Custom values',
    clear_all_tip: 'Clear all values',
    unsaved_description: 'Changes won’t be saved if you leave this page without saving.',
    deletion_tip: 'Delete the language',
    deletion_title: 'Do you want to delete the added language?',
    deletion_description:
      'After deletion, your users won’t be able to browse in that language again.',
    default_language_deletion_title: 'Default language can’t be deleted.',
    default_language_deletion_description:
      '{{language}} is set as your default language and can’t be deleted. ',
  },
};

export default Object.freeze(content);
