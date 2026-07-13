# Scale calibration changelog

Mechanical ÷2 pass (PDF @2× artboard → display scale). See [README.md — Scale calibration](./README.md#scale-calibration).

**Rule:** display = previous ÷ 2. Hairlines (`0.75px`/`1px`), radius, em/rem/unitless line-height, and `:root` token definitions were not changed. Shared `--ds-space-*` / PDF-geometry `--ds-size-*` *references* inside PDF-context selectors were replaced with halved literals (`/* calibrated ÷2 */`).

Total unique value changes: 187

| File | Selector | Before | After |
|------|----------|--------|-------|
| `styles.css` | `.ds-field--pdf .ds-field__input, .ds-field--pdf .ds-field__select` | `font-size: 20px` | `font-size: 10px` |
| `styles.css` | `.ds-field--pdf .ds-field__input, .ds-field--pdf .ds-field__select` | `padding: 10px` | `padding: 5px` |
| `styles.css` | `.ds-metric` | `gap: 11px` | `gap: 5.5px` |
| `styles.css` | `.ds-metric` | `min-height: var(--ds-size-metric-min-h)` | `min-height: 66px /* calibrated ÷2 */` |
| `styles.css` | `.ds-metric` | `padding: 10px` | `padding: 5px` |
| `styles.css` | `.ds-metric__label` | `font-size: 12px` | `font-size: 6px` |
| `styles.css` | `.ds-metric__value` | `font-size: 84px` | `font-size: 42px` |
| `styles.css` | `.ds-metric__change` | `font-size: 16px` | `font-size: 8px` |
| `styles.css` | `.ds-metric--ficha .ds-metric__value` | `font-size: 52px` | `font-size: 26px` |
| `styles.css` | `.ds-module-card` | `gap: var(--ds-space-5)` | `gap: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card` | `min-height: var(--ds-size-module-min)` | `min-height: 130px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card` | `min-width: var(--ds-size-module-min)` | `min-width: 130px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card` | `padding: 50px` | `padding: 25px` |
| `styles.css` | `.ds-module-card` | `padding: 25px` | `padding: 12.5px` |
| `styles.css` | `.ds-module-card` | `padding: var(--ds-space-5)` | `padding: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card__icon` | `min-height: var(--ds-size-icon-180)` | `min-height: 90px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card__icon img, .ds-module-card__icon svg` | `height: var(--ds-size-icon-180)` | `height: 90px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card__icon img, .ds-module-card__icon svg` | `width: var(--ds-size-icon-180)` | `width: 90px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card__headline` | `gap: var(--ds-space-2)` | `gap: 4px /* calibrated ÷2 */` |
| `styles.css` | `.ds-module-card__title` | `font-size: 24px` | `font-size: 12px` |
| `styles.css` | `.ds-module-card__metrics` | `gap: 10px` | `gap: 5px` |
| `styles.css` | `.ds-module-card__metric-label` | `font-size: 16px` | `font-size: 8px` |
| `styles.css` | `.ds-module-card__metric-value` | `font-size: 16px` | `font-size: 8px` |
| `styles.css` | `.ds-module-card__metric-value` | `min-width: var(--ds-size-control-sm)` | `min-width: 16px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task::before` | `height: var(--ds-size-task-accent)` | `height: 19px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task::before` | `right: -18px` | `right: -9px` |
| `styles.css` | `.ds-task::before` | `top: -18px` | `top: -9px` |
| `styles.css` | `.ds-task::before` | `width: var(--ds-size-task-accent)` | `width: 19px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task--default` | `gap: var(--ds-space-4)` | `gap: 8px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task--default` | `max-width: var(--ds-size-task-max-w)` | `max-width: 120px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task--default` | `padding: 15px` | `padding: 7.5px` |
| `styles.css` | `.ds-task--default` | `padding: 10px` | `padding: 5px` |
| `styles.css` | `.ds-task--kanban` | `gap: 5px` | `gap: 2.5px` |
| `styles.css` | `.ds-task--kanban` | `max-width: var(--ds-size-tile-max-w)` | `max-width: 140px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task--kanban` | `padding: 10px` | `padding: 5px` |
| `styles.css` | `.ds-task__code` | `font-size: 14px` | `font-size: 7px` |
| `styles.css` | `.ds-task__status` | `font-size: 18px` | `font-size: 9px` |
| `styles.css` | `.ds-task__title` | `font-size: 16px` | `font-size: 8px` |
| `styles.css` | `.ds-task__title` | `margin: var(--ds-space-5)` | `margin: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task__description` | `font-size: 16px` | `font-size: 8px` |
| `styles.css` | `.ds-task__meta` | `font-size: 14px` | `font-size: 7px` |
| `styles.css` | `.ds-task__meta` | `gap: var(--ds-space-1)` | `gap: 2px /* calibrated ÷2 */` |
| `styles.css` | `.ds-task--default .ds-task__meta` | `gap: 5px` | `gap: 2.5px` |
| `styles.css` | `.ds-task--kanban .ds-task__title` | `font-size: 18px` | `font-size: 9px` |
| `styles.css` | `.ds-task--kanban .ds-task__code` | `font-size: 13px` | `font-size: 6.5px` |
| `styles.css` | `.ds-task--kanban .ds-task__status` | `font-size: 16px` | `font-size: 8px` |
| `styles.css` | `.ds-task--kanban .ds-task__meta` | `font-size: 13px` | `font-size: 6.5px` |
| `styles.css` | `.ds-task--kanban .ds-task__meta` | `gap: 2px` | `gap: 1px` |
| `styles.css` | `.ds-investigation-card` | `gap: var(--ds-space-3)` | `gap: 6px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card` | `max-width: var(--ds-size-tile-max-w)` | `max-width: 140px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card` | `padding: 15px` | `padding: 7.5px` |
| `styles.css` | `.ds-investigation-card` | `padding: 10px` | `padding: 5px` |
| `styles.css` | `.ds-investigation-card--with-utilities` | `padding-right: 72px` | `padding-right: 36px` |
| `styles.css` | `.ds-investigation-card__utilities` | `gap: var(--ds-space-2)` | `gap: 4px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__utilities` | `right: 10px` | `right: 5px` |
| `styles.css` | `.ds-investigation-card__utilities` | `top: 15px` | `top: 7.5px` |
| `styles.css` | `.ds-investigation-card__utility` | `height: var(--ds-size-icon-xl)` | `height: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__utility` | `width: var(--ds-size-icon-xl)` | `width: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__utility img` | `height: var(--ds-size-icon-xl)` | `height: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__utility img` | `width: var(--ds-size-icon-xl)` | `width: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__icon` | `min-height: var(--ds-size-icon-50)` | `min-height: 25px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__icon` | `width: var(--ds-size-icon-50)` | `width: 25px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__icon img, .ds-investigation-card__icon svg` | `height: var(--ds-size-icon-50)` | `height: 25px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__icon img, .ds-investigation-card__icon svg` | `width: var(--ds-size-icon-50)` | `width: 25px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__title` | `font-size: 13pt` | `font-size: 6.5pt` |
| `styles.css` | `.ds-investigation-card__metrics` | `gap: var(--ds-space-3)` | `gap: 6px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__metrics` | `gap: var(--ds-space-4)` | `gap: 8px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__metric` | `gap: var(--ds-space-1)` | `gap: 2px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__metric-value` | `font-size: 14pt` | `font-size: 7pt` |
| `styles.css` | `.ds-investigation-card__metric-label` | `font-size: 10pt` | `font-size: 5pt` |
| `styles.css` | `.ds-investigation-card__actions` | `gap: 10px` | `gap: 5px` |
| `styles.css` | `.ds-investigation-card__actions` | `margin-top: var(--ds-space-1)` | `margin-top: 2px /* calibrated ÷2 */` |
| `styles.css` | `.ds-investigation-card__action` | `font-size: 11pt` | `font-size: 5.5pt` |
| `styles.css` | `.ds-investigation-card__action` | `padding: 5px` | `padding: 2.5px` |
| `styles.css` | `.ds-investigation-card__action` | `padding: var(--ds-space-5)` | `padding: 10px /* calibrated ÷2 */` |
| `styles.css` | `.ds-chart-card` | `gap: 10px` | `gap: 5px` |
| `styles.css` | `.ds-chart-card` | `min-width: var(--ds-size-card-min-w)` | `min-width: 110px /* calibrated ÷2 */` |
| `styles.css` | `.ds-chart-card` | `padding: 10px` | `padding: 5px` |
| `styles.css` | `.ds-chart-card__body` | `gap: var(--ds-space-3)` | `gap: 6px /* calibrated ÷2 */` |
| `styles.css` | `.ds-chart-card__body` | `min-height: var(--ds-size-chart-min-h)` | `min-height: 60px /* calibrated ÷2 */` |
| `styles.css` | `.ds-bar-chart__label, .ds-line-chart__label` | `font-size: 8px` | `font-size: 4px` |
| `styles.css` | `.ds-donut-chart__layout` | `min-height: var(--ds-size-metric-min-h)` | `min-height: 66px /* calibrated ÷2 */` |
| `styles.css` | `.ds-donut-chart__layout .ds-donut-chart` | `left: 90px` | `left: 45px` |
| `styles.css` | `.ds-donut-chart__layout .ds-donut-chart` | `max-width: var(--ds-size-chart-min-h)` | `max-width: 60px /* calibrated ÷2 */` |
| `styles.css` | `.ds-donut-chart__layout .ds-donut-chart` | `width: var(--ds-size-chart-min-h)` | `width: 60px /* calibrated ÷2 */` |
| `styles.css` | `.ds-donut-chart__stat` | `gap: 2px` | `gap: 1px` |
| `patterns/login/login.css` | `.login-screen` | `padding: 64px` | `padding: 32px` |
| `patterns/login/login.css` | `.login-screen` | `padding: 48px` | `padding: 24px` |
| `patterns/login/login.css` | `.login-screen__variants` | `gap: 56px` | `gap: 28px` |
| `patterns/login/login.css` | `.login-card` | `height: 413px` | `height: 206.5px` |
| `patterns/login/login.css` | `.login-card` | `padding: var(--ds-space-5)` | `padding: 10px /* calibrated ÷2 */` |
| `patterns/login/login.css` | `.login-card` | `width: 413px` | `width: 206.5px` |
| `patterns/login/login.css` | `.login-card__body--credentials` | `padding-top: 25px` | `padding-top: 12.5px` |
| `patterns/login/login.css` | `.login-card__pattern` | `gap: 40px` | `gap: 20px` |
| `patterns/login/login.css` | `.login-card__pattern` | `grid-template-columns: 45px` | `grid-template-columns: 22.5px` |
| `patterns/login/login.css` | `.login-card__pattern` | `grid-template-rows: 45px` | `grid-template-rows: 22.5px` |
| `patterns/login/login.css` | `.login-card__pattern-dot` | `height: 45px` | `height: 22.5px` |
| `patterns/login/login.css` | `.login-card__pattern-dot` | `width: 45px` | `width: 22.5px` |
| `patterns/login/login.css` | `.login-card__fields` | `gap: 35px` | `gap: 17.5px` |
| `patterns/login/login.css` | `.login-card__submit.ds-button` | `font-size: 18px` | `font-size: 9px` |
| `patterns/login/login.css` | `.login-card__submit.ds-button` | `padding: 10px` | `padding: 5px` |
| `patterns/login/login.css` | `.login-card__submit.ds-button` | `padding: 120px` | `padding: 60px` |
| `patterns/modal/modal.css` | `.modal-screen` | `padding: 64px` | `padding: 32px` |
| `patterns/modal/modal.css` | `.modal-screen` | `padding: 48px` | `padding: 24px` |
| `patterns/modal/modal.css` | `.modal-assistant` | `width: 774px` | `width: 387px` |
| `patterns/modal/modal.css` | `.modal-assistant__greeting` | `font-size: 24px` | `font-size: 12px` |
| `patterns/modal/modal.css` | `.modal-assistant__greeting` | `margin: 9px` | `margin: 4.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__greeting` | `margin: 8px` | `margin: 4px` |
| `patterns/modal/modal.css` | `.modal-assistant__shell` | `height: 208px` | `height: 104px` |
| `patterns/modal/modal.css` | `.modal-assistant__shell` | `width: 774px` | `width: 387px` |
| `patterns/modal/modal.css` | `.modal-assistant__top` | `gap: var(--ds-space-3)` | `gap: 6px /* calibrated ÷2 */` |
| `patterns/modal/modal.css` | `.modal-assistant__top` | `left: 34px` | `left: 17px` |
| `patterns/modal/modal.css` | `.modal-assistant__top` | `right: 22px` | `right: 11px` |
| `patterns/modal/modal.css` | `.modal-assistant__top` | `top: 16px` | `top: 8px` |
| `patterns/modal/modal.css` | `.modal-assistant__prompt .ds-field__input` | `font-size: 18px` | `font-size: 9px` |
| `patterns/modal/modal.css` | `.modal-assistant__mic` | `height: 36px` | `height: 18px` |
| `patterns/modal/modal.css` | `.modal-assistant__mic` | `width: 20px` | `width: 10px` |
| `patterns/modal/modal.css` | `.modal-assistant__mic svg` | `height: 28px` | `height: 14px` |
| `patterns/modal/modal.css` | `.modal-assistant__mic svg` | `width: 20px` | `width: 10px` |
| `patterns/modal/modal.css` | `.modal-assistant__attach` | `gap: 10px` | `gap: 5px` |
| `patterns/modal/modal.css` | `.modal-assistant__attach` | `left: 38px` | `left: 19px` |
| `patterns/modal/modal.css` | `.modal-assistant__attach` | `top: 86px` | `top: 43px` |
| `patterns/modal/modal.css` | `.modal-assistant__attach-plus` | `height: 11px` | `height: 5.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__attach-plus` | `width: 11px` | `width: 5.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__attach-label` | `font-size: 14px` | `font-size: 7px` |
| `patterns/modal/modal.css` | `.modal-assistant__execute.ds-button` | `bottom: 21px` | `bottom: 10.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__execute.ds-button` | `font-size: 13px` | `font-size: 6.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__execute.ds-button` | `min-height: 25px` | `min-height: 12.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__execute.ds-button` | `right: 34px` | `right: 17px` |
| `patterns/modal/modal.css` | `.modal-assistant__execute.ds-button` | `width: 135px` | `width: 67.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__suggestions` | `gap: 53px` | `gap: 26.5px` |
| `patterns/modal/modal.css` | `.modal-assistant__suggestions` | `margin: 22px` | `margin: 11px` |
| `patterns/modal/modal.css` | `.modal-assistant__suggestions` | `padding: 10px` | `padding: 5px` |
| `patterns/modal/modal.css` | `.modal-assistant__suggestion` | `font-size: 14px` | `font-size: 7px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet` | `gap: 28px` | `gap: 14px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet` | `max-width: 1180px` | `max-width: 590px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet` | `padding: 40px` | `padding: 20px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__header` | `gap: 20px` | `gap: 10px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__header-main` | `gap: 14px` | `gap: 7px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__status-row` | `gap: 10px` | `gap: 5px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__status` | `font-size: 16px` | `font-size: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__status--critical` | `padding: 2px` | `padding: 1px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__status--critical` | `padding: 6px` | `padding: 3px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__title` | `font-size: 40px` | `font-size: 20px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__header-tools` | `gap: 12px` | `gap: 6px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__icon-row` | `gap: 10px` | `gap: 5px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__icon-button` | `height: 24px` | `height: 12px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__icon-button` | `width: 24px` | `width: 12px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__icon-button svg` | `height: 20px` | `height: 10px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__icon-button svg` | `width: 20px` | `width: 10px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__filters` | `gap: 10px` | `gap: 5px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__filters` | `grid-template-columns: 150px` | `grid-template-columns: 75px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__filters` | `min-width: 320px` | `min-width: 160px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__filters .ds-field__control` | `min-height: 44px` | `min-height: 22px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__filters .ds-field__select` | `font-size: 24px` | `font-size: 12px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__body` | `gap: 24px` | `gap: 12px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__body-left, .detail-sheet__body-right` | `gap: 24px` | `gap: 12px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__narrative` | `gap: 16px` | `gap: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__narrative` | `padding: 20px` | `padding: 10px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__narrative-title` | `font-size: 16px` | `font-size: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__narrative-text` | `font-size: 18px` | `font-size: 9px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media` | `gap: 16px` | `gap: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-title` | `font-size: 16px` | `font-size: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-metrics` | `gap: 12px` | `gap: 6px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-preview-frame` | `min-height: 180px` | `min-height: 90px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-preview-play` | `height: 44px` | `height: 22px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-preview-play` | `width: 44px` | `width: 22px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-preview-play svg` | `height: 18px` | `height: 9px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-preview-play svg` | `margin-left: 2px` | `margin-left: 1px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-preview-play svg` | `width: 18px` | `width: 9px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__media-preview-progress` | `height: 6px` | `height: 3px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__metrics` | `gap: 12px` | `gap: 6px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet .ds-chart-card` | `gap: 12px` | `gap: 6px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet .ds-chart-card` | `min-height: 280px` | `min-height: 140px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet .ds-chart-card` | `padding: 10px` | `padding: 5px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet .ds-chart-card__title` | `font-size: 16px` | `font-size: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet .ds-chart-card__body` | `min-height: 220px` | `min-height: 110px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet .ds-chart-card__footer` | `font-size: 16px` | `font-size: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet .ds-line-chart` | `height: 220px` | `height: 110px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__actions` | `gap: 20px` | `gap: 10px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__actions-label` | `font-size: 16px` | `font-size: 8px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__actions-row` | `gap: 10px` | `gap: 5px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__action-button.ds-button` | `font-size: 13px` | `font-size: 6.5px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__action-button.ds-button` | `padding: 5px` | `padding: 2.5px` |
| `patterns/detail-sheet/detail-sheet.css` | `.detail-sheet__action-button.ds-button` | `padding: 25px` | `padding: 12.5px` |

| \styles.css\ | \.ds-line-chart__grid\ | \stroke-width: 1\ | \stroke-width: 0.5\ |
| \styles.css\ | \.ds-line-chart__line\ | \stroke-width: 2\ | \stroke-width: 1\ |

## Rounding (odd → .5)
- 11.0pt → 5.5pt
- 11.0px → 5.5px
- 13.0pt → 6.5pt
- 13.0px → 6.5px
- 135.0px → 67.5px
- 15.0px → 7.5px
- 21.0px → 10.5px
- 25.0px → 12.5px
- 35.0px → 17.5px
- 413.0px → 206.5px
- 45.0px → 22.5px
- 5.0px → 2.5px
- 53.0px → 26.5px
- 9.0px → 4.5px