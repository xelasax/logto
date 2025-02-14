const application_details = {
  page_title: 'Szczegóły aplikacji',
  back_to_applications: 'Powrót do aplikacji',
  check_guide: 'Sprawdź przewodnik',
  settings: 'Ustawienia',
  settings_description:
    'Aplikacja to zarejestrowane oprogramowanie lub usługa, która może uzyskać dostęp do informacji użytkownika lub działać w imieniu użytkownika. Aplikacje pomagają rozpoznać, kto czego od Logto żąda i obsługują proces logowania oraz udzielania uprawnień. Wypełnij wymagane pola dla uwierzytelniania.',
  integration: 'Integracja',
  integration_description:
    'Wdrożenie zabezpieczonych workerów Logto, zasilanych przez sieć rozproszoną Cloudflare, zapewniających najlepszą wydajność i zerowy czas uruchamiania odwołań na całym świecie.',
  service_configuration: 'Konfiguracja usługi',
  service_configuration_description: 'Uzupełnij niezbędne konfiguracje w swojej usłudze.',
  session: 'Sesja',
  endpoints_and_credentials: 'Punkty końcowe i dane uwierzytelniające',
  endpoints_and_credentials_description:
    'Użyj poniższych punktów końcowych i danych uwierzytelniających do skonfigurowania połączenia OIDC w Twojej aplikacji.',
  refresh_token_settings: 'Token odświeżania',
  refresh_token_settings_description:
    'Zarządzaj zasadami dotyczącymi tokena odświeżania dla tej aplikacji.',
  machine_logs: 'Dzienniki maszynowe',
  application_name: 'Nazwa aplikacji',
  application_name_placeholder: 'Moja aplikacja',
  description: 'Opis',
  description_placeholder: 'Wpisz opis swojej aplikacji',
  config_endpoint: 'Konfiguracja punktu końcowego OpenID Provider',
  issuer_endpoint: 'Punkt końcowy emitenta',
  /** UNTRANSLATED */
  jwks_uri: 'JWKS URI',
  authorization_endpoint: 'Endpoint autoryzacji',
  authorization_endpoint_tip:
    'Punkt końcowy wykorzystywany do uwierzytelniania i autoryzacji. Jest używany do OpenID Connect <a>uwierzytelniania</a>.',
  show_endpoint_details: 'Pokaż szczegóły punktu końcowego',
  hide_endpoint_details: 'Ukryj szczegóły punktu końcowego',
  logto_endpoint: 'Punkt końcowy Logto',
  application_id: 'ID aplikacji',
  application_id_tip:
    'Unikalny identyfikator aplikacji, który zazwyczaj jest generowany przez Logto. Oznacza również „<a>client_id</a>” w OpenID Connect.',
  application_secret: 'Tajny kod aplikacji',
  application_secret_other: 'Sekrety aplikacji',
  redirect_uri: 'Adres URL przekierowania',
  redirect_uris: 'Adresy URL przekierowania',
  redirect_uri_placeholder: 'https://twoja.strona.com/aplikacja',
  redirect_uri_placeholder_native: 'io.logto://callback',
  redirect_uri_tip:
    'Adres URL, na który użytkownik jest przekierowywany po zalogowaniu (zarówno pozytywnym, jak i negatywnym). Zobacz OpenID Connect <a>AuthRequest</a> po więcej informacji.',
  mixed_redirect_uri_warning:
    'Typ Twojej aplikacji jest niekompatybilny z co najmniej jednym z adresów URL przekierowania. To nie jest zgodne z najlepszymi praktykami i zdecydowanie zalecamy zachowanie spójności adresów URL przekierowania.',
  post_sign_out_redirect_uri: 'Adres URL przekierowania po wylogowaniu',
  post_sign_out_redirect_uris: 'Adresy URL przekierowania po wylogowaniu',
  post_sign_out_redirect_uri_placeholder: 'https://twoja.strona.com/strona-startowa',
  post_sign_out_redirect_uri_tip:
    'Adres URL, na który użytkownik jest przekierowywany po wylogowaniu (opcjonalnie). W niektórych rodzajach aplikacji może to nie mieć praktycznego znaczenia.',
  cors_allowed_origins: 'Dozwolone źródła CORS',
  cors_allowed_origins_placeholder: 'https://twoja.strona.com',
  cors_allowed_origins_tip:
    'Domyślnie dozwolone są wszystkie źródła z adresów URL przekierowania. Zazwyczaj nie wymaga to żadnych działań. Zobacz <a>dokumentację MDN</a> dla szczegółowych informacji.',
  token_endpoint: 'Punkt końcowy tokena',
  user_info_endpoint: 'Punkt końcowy informacji o użytkowniku',
  enable_admin_access: 'Włącz dostęp administratora',
  enable_admin_access_label:
    'Włącz lub wyłącz dostęp do interfejsu API zarządzania. Po włączeniu możesz używać tokenów dostępu do wywoływania interfejsu API zarządzania w imieniu tej aplikacji.',
  always_issue_refresh_token: 'Zawsze wydawaj token odświeżania',
  always_issue_refresh_token_label:
    'Ta konfiguracja umożliwia Logto zawsze wydawanie cewecznych tokenów, niezależnie od tego, czy w żądaniu autoryzacji został przekazany `prompt=consent`. Jednak ta praktyka jest odstraszana, chyba że konieczna, ponieważ nie jest w pełni zgodna z OpenID Connect i potencjalnie może powodować problemy.',
  refresh_token_ttl: 'Czas życia tokena odświeżania w dniach',
  refresh_token_ttl_tip:
    'Okres, przez który można używać tokena odświeżania do żądania nowych tokenów dostępu, zanim wygaśnie i zostanie unieważniony. Wymaga to przedłużenia czasu życia żądanego tokena.',
  rotate_refresh_token: 'Obróć token odświeżania',
  rotate_refresh_token_label:
    'Po włączeniu tej opcji Logto wydaje nowy token odświeżania dla żądań tokenów, gdy upłynęło 70% oryginalnego czasu życia (TTL) lub spełnione są określone warunki. <a>Dowiedz się więcej</a>',
  rotate_refresh_token_label_for_public_clients:
    'Po włączeniu, Logto wyda nowy token odświeżania dla każdego żądania tokena. <a>Dowiedz się więcej</a>',
  backchannel_logout: 'Backchannel Logout',
  backchannel_logout_description:
    'Skonfiguruj punkt końcowy OpenID Connect backchannel logout i czy sesja jest wymagana dla tej aplikacji.',
  backchannel_logout_uri: 'URI backchannel logout',
  backchannel_logout_uri_session_required: 'Czy sesja jest wymagana?',
  backchannel_logout_uri_session_required_description:
    'Po włączeniu, RP wymaga, aby roszczenie `sid` (ID sesji) było zawarte w tokenie wylogowania, aby zidentyfikować sesję RP z OP, gdy używany jest `backchannel_logout_uri`.',
  delete_description:
    'Ta operacja nie może zostać cofnięta. Spowoduje trwałe usunięcie aplikacji. Aby potwierdzić, wpisz nazwę aplikacji <span>{{name}}</span>.',
  enter_your_application_name: 'Wpisz nazwę swojej aplikacji',
  application_deleted: 'Aplikacja {{name}} została pomyślnie usunięta',
  redirect_uri_required: 'Musisz podać co najmniej jeden adres URL przekierowania',
  app_domain_description_1:
    'Skorzystaj z domeny {{domain}} obsługiwanej przez Logto, która jest trwale ważna.',
  app_domain_description_2:
    'Skorzystaj z domeny <domain>{{domain}}</domain>, która jest trwale ważna.',
  custom_rules: 'Niestandardowe zasady uwierzytelniania',
  custom_rules_placeholder: '^/(admin|privacy)/.+$',
  custom_rules_description:
    'Ustaw zasady z wyrażeniami regularnymi dla wymaganych tras wymagających uwierzytelniania. Domyślnie: ochrona całej strony, jeśli pole jest puste.',
  authentication_routes: 'Trasy uwierzytelniania',
  custom_rules_tip:
    'Oto dwa scenariusze:<ol><li>Aby chronić tylko trasy „/admin” i „/privacy” za pomocą uwierzytelniania: ^/(admin|privacy)/.*</li><li>Aby wykluczyć obrazy JPG z uwierzytelniania: ^(?!.*\\.jpg$).*$</li></ol>',
  authentication_routes_description:
    'Przekieruj przycisk uwierzytelniania, korzystając z określonych tras. Uwaga: te trasy są niezastąpione.',
  protect_origin_server: 'Zabezpiecz swój serwer źródłowy',
  protect_origin_server_description:
    'Upewnij się, że chronisz swój serwer źródłowy przed bezpośrednim dostępem. Odniesienie do przewodnika dla więcej <a>szczegółowych instrukcji</a>.',
  /** UNTRANSLATED */
  third_party_settings_description:
    'Integrate third-party applications with Logto as your Identity Provider (IdP) using OIDC / OAuth 2.0, featuring a consent screen for user authorization.',
  session_duration: 'Czas trwania sesji (dni)',
  try_it: 'Wypróbuj',
  no_organization_placeholder: 'Nie znaleziono organizacji. <a>Przejdź do organizacji</a>',
  field_custom_data: 'Dane niestandardowe',
  field_custom_data_tip:
    'Dodatkowe niestandardowe informacje o aplikacji, które nie są wymienione w predefiniowanych właściwościach aplikacji, takie jak ustawienia i konfiguracje specyficzne dla biznesu.',
  custom_data_invalid: 'Dane niestandardowe muszą być poprawnym obiektem JSON',
  branding: {
    name: 'Branding',
    description: 'Dostosuj nazwę i logo aplikacji na ekranie zgody.',
    description_third_party: 'Dostosuj nazwę wyświetlaną aplikacji i logo na ekranie zgody.',
    app_logo: 'Logo aplikacji',
    app_level_sie: 'Doświadczenie logowania na poziomie aplikacji',
    app_level_sie_switch:
      'Włącz doświadczenie logowania na poziomie aplikacji i ustaw branding specyficzny dla aplikacji. Jeśli jest wyłączony, używane będzie doświadczenie omni sign-in.',
    more_info: 'Więcej informacji',
    more_info_description:
      'Zaoferuj użytkownikom więcej szczegółów na temat Twojej aplikacji na ekranie zgody.',
    display_name: 'Nazwa wyświetlana',
    application_logo: 'Logo aplikacji',
    application_logo_dark: 'Logo aplikacji (ciemne)',
    brand_color: 'Kolor marki',
    brand_color_dark: 'Kolor marki (ciemny)',
    terms_of_use_url: 'Adres URL warunków użytkowania aplikacji',
    privacy_policy_url: 'Adres URL polityki prywatności aplikacji',
  },
  permissions: {
    name: 'Uprawnienia',
    description:
      'Wybierz uprawnienia, których wymaga aplikacja innych firm do autoryzacji użytkownika w celu uzyskania dostępu do określonych typów danych.',
    user_permissions: 'Dane osobowe użytkownika',
    organization_permissions: 'Dostęp do organizacji',
    table_name: 'Udziel uprawnień',
    field_name: 'Uprawnienie',
    field_description: 'Wyświetlane na ekranie zgody',
    delete_text: 'Usuń uprawnienie',
    permission_delete_confirm:
      'Ta czynność odwoła nadane uprawnienia dla aplikacji innej firmy, uniemożliwiając jej żądanie autoryzacji użytkownika do określonych typów danych. Czy na pewno chcesz kontynuować?',
    permissions_assignment_description:
      'Wybierz uprawnienia, które aplikacja innej firmy ma żądać do uzyskania autoryzacji użytkownika do określonych typów danych.',
    user_profile: 'Dane użytkownika',
    api_permissions: 'Uprawnienia API',
    organization: 'Uprawnienia organizacyjne',
    user_permissions_assignment_form_title: 'Dodaj uprawnienia do profilu użytkownika',
    organization_permissions_assignment_form_title: 'Dodaj uprawnienia organizacji',
    api_resource_permissions_assignment_form_title: 'Dodaj uprawnienia zasobów API',
    user_data_permission_description_tips:
      'Możesz zmodyfikować opis uprawnień do danych osobowych użytkownika za pomocą „Doświadczenia przy logowaniu > Zasób > Zarządzaj Językiem”',
    permission_description_tips:
      'Gdy Logto jest wykorzystywane jako Dostawca Tożsamości (IdP) do uwierzytelniania w aplikacjach innych firm, a użytkownicy są proszeni o autoryzację, ten opis pojawia się na ekranie zgody.',
    user_title: 'Użytkownik',
    user_description:
      'Wybierz uprawnienia żądane przez aplikację innej firmy do uzyskania dostępu do określonych danych użytkownika.',
    grant_user_level_permissions: 'Udziel uprawnień do danych użytkownika',
    organization_title: 'Organizacja',
    organization_description:
      'Wybierz uprawnienia żądane przez aplikację innej firmy do uzyskania dostępu do określonych danych organizacyjnych.',
    grant_organization_level_permissions: 'Udziel uprawnień do danych organizacyjnych',
  },
  roles: {
    assign_button: 'Przypisz role między maszynami',
    delete_description:
      'Ta czynność usunie tę rolę z tej aplikacji machine-to-machine. Rola ta nadal istnieje, ale nie będzie już powiązana z tą aplikacją machine-to-machine.',
    deleted: '{{name}} został(a) pomyślnie usunięty(ą) z tego użytkownika.',
    assign_title: 'Przypisz role między maszynami do {{name}}',
    assign_subtitle:
      'Aplikacje machine-to-machine muszą mieć role typu machine-to-machine, aby uzyskać dostęp do powiązanych zasobów API.',
    assign_role_field: 'Przypisz role między maszynami',
    role_search_placeholder: 'Wyszukaj według nazwy roli',
    added_text: '{{value, number}} dodane',
    assigned_app_count: '{{value, number}} aplikacje',
    confirm_assign: 'Przypisz role między maszynami',
    role_assigned: 'Pomyślnie przypisano rolę(y)',
    search: 'Wyszukaj według nazwy roli, opisu lub ID',
    empty: 'Brak dostępnych ról',
  },
  secrets: {
    value: 'Wartość',
    empty: 'Aplikacja nie ma żadnych sekretów.',
    created_at: 'Utworzono',
    expires_at: 'Wygasa o',
    never: 'Nigdy',
    create_new_secret: 'Utwórz nowy sekret',
    delete_confirmation:
      'Ta czynność nie może zostać cofnięta. Czy na pewno chcesz usunąć ten sekret?',
    deleted: 'Sekret został pomyślnie usunięty.',
    activated: 'Sekret został pomyślnie aktywowany.',
    deactivated: 'Sekret został pomyślnie dezaktywowany.',
    legacy_secret: 'Sekret dziedziczenia',
    expired: 'Wygasły',
    expired_tooltip: 'Ten sekret wygasł w dniu {{date}}.',
    create_modal: {
      title: 'Utwórz sekret aplikacji',
      expiration: 'Ważność',
      expiration_description: 'Sekret wygaśnie w dniu {{date}}.',
      expiration_description_never:
        'Sekret nigdy nie wygaśnie. Zalecamy ustawienie daty wygaśnięcia dla zwiększenia bezpieczeństwa.',
      days: '{{count}} dzień',
      days_other: '{{count}} dni',
      years: '{{count}} rok',
      years_other: '{{count}} lata',
      created: 'Sekret {{name}} został pomyślnie utworzony.',
    },
    edit_modal: {
      title: 'Edytuj sekret aplikacji',
      edited: 'Sekret {{name}} został pomyślnie zaktualizowany.',
    },
  },
  saml_idp_config: {
    title: 'Metadane SAML IdP',
    description:
      'Użyj poniższych metadanych i certyfikatu do skonfigurowania SAML IdP w swojej aplikacji.',
    metadata_url_label: 'URL metadanych IdP',
    single_sign_on_service_url_label: 'URL usługi jednokrotnego logowania',
    idp_entity_id_label: 'Identyfikator jednostki IdP',
  },
  saml_idp_certificates: {
    title: 'Certyfikat podpisywania SAML',
    expires_at: 'Wygasa o',
    finger_print: 'Odcisk palca',
    status: 'Status',
    active: 'Aktywny',
    inactive: 'Nieaktywny',
  },
  saml_idp_name_id_format: {
    title: 'Format identyfikatora nazwiska',
    description: 'Wybierz format identyfikatora nazwiska SAML IdP.',
    persistent: 'Stały',
    persistent_description: 'Użyj ID użytkownika Logto jako identyfikatora nazwy',
    transient: 'Tymczasowy',
    transient_description: 'Użyj jednorazowego ID użytkownika jako identyfikatora nazwy',
    unspecified: 'Nieokreślony',
    unspecified_description: 'Użyj ID użytkownika Logto jako identyfikatora nazwy',
    email_address: 'Adres e-mail',
    email_address_description: 'Użyj adresu e-mail jako identyfikatora nazwy',
  },
  saml_encryption_config: {
    encrypt_assertion: 'Szyfruj oświadczenie SAML',
    encrypt_assertion_description: 'Włączając tę opcję, oświadczenie SAML zostanie zaszyfrowane.',
    encrypt_then_sign: 'Szyfruj, a następnie podpisz',
    encrypt_then_sign_description:
      'Włączając tę opcję, oświadczenie SAML zostanie zaszyfrowane, a następnie podpisane; w przeciwnym razie oświadczenie SAML zostanie podpisane, a następnie zaszyfrowane.',
    certificate: 'Certyfikat',
    certificate_tooltip:
      'Skopiuj i wklej certyfikat x509, który otrzymasz od swojego dostawcy usług, aby zaszyfrować oświadczenie SAML.',
    certificate_placeholder:
      '-----BEGIN CERTIFICATE-----\nMIICYDCCAcmgAwIBA...\n-----END CERTIFICATE-----\n',
    certificate_missing_error: 'Certyfikat jest wymagany.',
    certificate_invalid_format_error:
      'Wykryto nieprawidłowy format certyfikatu. Proszę sprawdzić format certyfikatu i spróbować ponownie.',
  },
  saml_app_attribute_mapping: {
    name: 'Mapowania atrybutów',
    title: 'Podstawowe mapowania atrybutów',
    description:
      'Dodaj mapowania atrybutów, aby synchronizować profil użytkownika z Logto do swojej aplikacji.',
    col_logto_claims: 'Wartość Logto',
    col_sp_claims: 'Nazwa wartości w Twojej aplikacji',
    add_button: 'Dodaj kolejne',
  },
};

export default Object.freeze(application_details);
