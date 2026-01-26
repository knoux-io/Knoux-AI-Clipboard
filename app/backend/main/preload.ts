 Project: Knoux-Clipboard-AI
 Aisha  Write-Host ("=" * 80)
================================================================================
 Aisha  $OutputFile.WriteLine(" Project: $ProjectName")
 Aisha  $OutputFile.WriteLine(("=" * 80))
 Aisha 
 Aisha  Show-Tree -Path $RootPath -TotalSize $TotalSize -OutputFile $OutputFile
[DIR] app
    [DIR] assets
        [DIR] icons
        [DIR] splash
    [DIR] backend
        [DIR] ai
            [FILE] ai-database.ts [20.02 KB | 0.0196 MB | 0 %]
            [FILE] ai-engine.ts [26.35 KB | 0.0257 MB | 0 %]
            [FILE] classifier.ts [30.32 KB | 0.0296 MB | 0.01 %]
            [FILE] enhancer.ts [24.77 KB | 0.0242 MB | 0 %]
            [FILE] prompt-library.ts [26.4 KB | 0.0258 MB | 0 %]
            [FILE] summarizer.ts [32.13 KB | 0.0314 MB | 0.01 %]
        [DIR] clipboard
            [FILE] formatter.ts [25.81 KB | 0.0252 MB | 0 %]
            [FILE] history-store.ts [25.23 KB | 0.0246 MB | 0 %]
            [FILE] normalizer.ts [22.46 KB | 0.0219 MB | 0 %]
            [FILE] watcher.ts [25.75 KB | 0.0251 MB | 0 %]
        [DIR] ipc
            [FILE] enhanced-handlers.ts [14.48 KB | 0.0141 MB | 0 %]
            [FILE] handlers.ts [9.7 KB | 0.0095 MB | 0 %]
        [DIR] main
            [FILE] lifecycle.ts [23.92 KB | 0.0234 MB | 0 %]
            [FILE] main.ts [4.94 KB | 0.0048 MB | 0 %]
            [FILE] preload.js [1.88 KB | 0.0018 MB | 0 %]
            [FILE] preload.ts [30.75 KB | 0.03 MB | 0.01 %]
            [FILE] tray.ts [15.73 KB | 0.0154 MB | 0 %]
            [FILE] window-manager.ts [15.71 KB | 0.0153 MB | 0 %]
        [DIR] security
            [FILE] encryptor.ts [3.33 KB | 0.0033 MB | 0 %]
            [FILE] permission-guard.ts [2.29 KB | 0.0022 MB | 0 %]
            [FILE] sandbox.ts [1.46 KB | 0.0014 MB | 0 %]
            [FILE] security-manager.ts [11.92 KB | 0.0116 MB | 0 %]
            [FILE] sensitive-detector.ts [2.73 KB | 0.0027 MB | 0 %]
        [DIR] services
            [FILE] aiService.ts [14.98 KB | 0.0146 MB | 0 %]
            [FILE] databaseService.ts [14.63 KB | 0.0143 MB | 0 %]
            [FILE] languageService.ts [11.19 KB | 0.0109 MB | 0 %]
            [FILE] settingsService.ts [4.77 KB | 0.0047 MB | 0 %]
            [FILE] themeService.ts [9.53 KB | 0.0093 MB | 0 %]
        [DIR] storage
            [FILE] cache.ts [2.05 KB | 0.002 MB | 0 %]
            [FILE] export-import.ts [1.31 KB | 0.0013 MB | 0 %]
            [FILE] local-db.ts [2.68 KB | 0.0026 MB | 0 %]
        [DIR] system
            [FILE] autostart.ts [0.9 KB | 0.0009 MB | 0 %]
            [FILE] os-detector.ts [0.61 KB | 0.0006 MB | 0 %]
            [FILE] updater.ts [2.01 KB | 0.002 MB | 0 %]
        [FILE] init.ts [0.58 KB | 0.0006 MB | 0 %]
        [FILE] integration-test.ts [9.81 KB | 0.0096 MB | 0 %]
        [FILE] service-integration.ts [12.26 KB | 0.012 MB | 0 %]
        [FILE] service-manager.ts [9.91 KB | 0.0097 MB | 0 %]
    [DIR] renderer
        [DIR] components
            [DIR] settings
                [FILE] GeneralSettings.tsx [5.75 KB | 0.0056 MB | 0 %]
            [FILE] AboutKnoux.tsx [19.58 KB | 0.0191 MB | 0 %]
            [FILE] ActionButton.css [3.11 KB | 0.003 MB | 0 %]
            [FILE] ActionButton.tsx [0.92 KB | 0.0009 MB | 0 %]
            [FILE] AIProcessor.tsx [43.48 KB | 0.0425 MB | 0.01 %]
            [FILE] AppInfo.tsx [9.78 KB | 0.0096 MB | 0 %]
            [FILE] ClipboardItem.tsx [10.42 KB | 0.0102 MB | 0 %]
            [FILE] ClipboardList.tsx [18.59 KB | 0.0182 MB | 0 %]
            [FILE] ClipboardPreview.tsx [11.86 KB | 0.0116 MB | 0 %]
            [FILE] ClipboardView.tsx [38.98 KB | 0.0381 MB | 0.01 %]
            [FILE] DashboardFeatures.tsx [11.83 KB | 0.0116 MB | 0 %]
            [FILE] DigitalClock.tsx [1.5 KB | 0.0015 MB | 0 %]
            [FILE] ErrorBoundary.tsx [1.37 KB | 0.0013 MB | 0 %]
            [FILE] FilterPanel.tsx [15.61 KB | 0.0152 MB | 0 %]
            [FILE] HistoryTimeline.tsx [1.42 KB | 0.0014 MB | 0 %]
            [FILE] ItemPreview.css [3.98 KB | 0.0039 MB | 0 %]
            [FILE] ItemPreview.tsx [1.62 KB | 0.0016 MB | 0 %]
            [FILE] Layout.tsx [0.51 KB | 0.0005 MB | 0 %]
            [FILE] LoadingOverlay.tsx [0.57 KB | 0.0006 MB | 0 %]
            [FILE] LoadingScreen.tsx [0.96 KB | 0.0009 MB | 0 %]
            [FILE] SearchBar.tsx [33.43 KB | 0.0326 MB | 0.01 %]
            [FILE] SettingsPanel.tsx [16.82 KB | 0.0164 MB | 0 %]
            [FILE] Sidebar.tsx [3.32 KB | 0.0032 MB | 0 %]
            [FILE] SidebarClean.tsx [2.97 KB | 0.0029 MB | 0 %]
            [FILE] SplashScreen.tsx [3.06 KB | 0.003 MB | 0 %]
            [FILE] StatusCard.css [3.08 KB | 0.003 MB | 0 %]
            [FILE] StatusCard.tsx [1.65 KB | 0.0016 MB | 0 %]
            [FILE] SystemBar.tsx [10.42 KB | 0.0102 MB | 0 %]
            [FILE] TagManager.tsx [1.92 KB | 0.0019 MB | 0 %]
            [FILE] ToastContainer.css [3.48 KB | 0.0034 MB | 0 %]
            [FILE] ToastContainer.tsx [1.69 KB | 0.0016 MB | 0 %]
        [DIR] config
            [FILE] dashboardConfig.ts [1.02 KB | 0.001 MB | 0 %]
        [DIR] containers
            [FILE] UnifiedAppContainer.tsx [6.74 KB | 0.0066 MB | 0 %]
        [DIR] contexts
            [FILE] AIContext.tsx [0.59 KB | 0.0006 MB | 0 %]
            [FILE] ClipboardContext.tsx [2.59 KB | 0.0025 MB | 0 %]
            [FILE] NotificationContext.tsx [2.31 KB | 0.0023 MB | 0 %]
            [FILE] SettingsContext.tsx [0.98 KB | 0.001 MB | 0 %]
            [FILE] ThemeContext.tsx [1.33 KB | 0.0013 MB | 0 %]
        [DIR] hooks
            [FILE] useAI_backup.ts [18.8 KB | 0.0184 MB | 0 %]
            [FILE] useAI.ts [18.8 KB | 0.0184 MB | 0 %]
            [FILE] useAIFixed.ts [18.8 KB | 0.0184 MB | 0 %]
            [FILE] useClipboard.ts [9.97 KB | 0.0097 MB | 0 %]
            [FILE] useDatabase.ts [6.39 KB | 0.0062 MB | 0 %]
            [FILE] useLanguage.ts [2.64 KB | 0.0026 MB | 0 %]
            [FILE] useSearch.ts [11.52 KB | 0.0112 MB | 0 %]
            [FILE] useSettings.ts [5.87 KB | 0.0057 MB | 0 %]
            [FILE] useTheme.ts [6.08 KB | 0.0059 MB | 0 %]
            [FILE] useToast.ts [1.26 KB | 0.0012 MB | 0 %]
        [DIR] i18n
            [FILE] ar.json [4.17 KB | 0.0041 MB | 0 %]
            [FILE] en.json [3.33 KB | 0.0033 MB | 0 %]
        [DIR] layouts
        [DIR] pages
            [FILE] DashboardPage.tsx [10.03 KB | 0.0098 MB | 0 %]
        [DIR] services
            [FILE] ClipboardService.ts [6.03 KB | 0.0059 MB | 0 %]
            [FILE] initialization.ts [0.23 KB | 0.0002 MB | 0 %]
        [DIR] sidebar
        [DIR] styles
            [FILE] animations.css [14.14 KB | 0.0138 MB | 0 %]
            [FILE] global.css [7.65 KB | 0.0075 MB | 0 %]
            [FILE] theme-dark.css [9.01 KB | 0.0088 MB | 0 %]
            [FILE] theme-light.css [10.67 KB | 0.0104 MB | 0 %]
            [FILE] theme.ts [0.69 KB | 0.0007 MB | 0 %]
        [DIR] types
            [FILE] electron.d.ts [0.53 KB | 0.0005 MB | 0 %]
            [FILE] global.d.ts [1.25 KB | 0.0012 MB | 0 %]
        [DIR] utils
            [FILE] helpers.ts [9.22 KB | 0.009 MB | 0 %]
            [FILE] i18n.ts [3.04 KB | 0.003 MB | 0 %]
        [DIR] views
            [FILE] About.css [8.62 KB | 0.0084 MB | 0 %]
            [FILE] AboutClean.tsx [7.17 KB | 0.007 MB | 0 %]
            [FILE] AIInsights.tsx [33.25 KB | 0.0325 MB | 0.01 %]
            [FILE] ClipboardHistory.tsx [29.68 KB | 0.029 MB | 0.01 %]
            [FILE] Dashboard.css [6.79 KB | 0.0066 MB | 0 %]
            [FILE] Dashboard.tsx [10.54 KB | 0.0103 MB | 0 %]
            [FILE] SecurityCenter.tsx [22.66 KB | 0.0221 MB | 0 %]
            [FILE] VIP.css [8.86 KB | 0.0086 MB | 0 %]
            [FILE] VIP.tsx [8.84 KB | 0.0086 MB | 0 %]
        [FILE] App.tsx [5.05 KB | 0.0049 MB | 0 %]
        [FILE] AppClean.tsx [6.3 KB | 0.0062 MB | 0 %]
        [FILE] AppFinal.tsx [6.29 KB | 0.0061 MB | 0 %]
        [FILE] AppIntegrated.tsx [19.46 KB | 0.019 MB | 0 %]
        [FILE] index.html [1.38 KB | 0.0014 MB | 0 %]
        [FILE] index.tsx [0.28 KB | 0.0003 MB | 0 %]
        [FILE] main.tsx [0.47 KB | 0.0005 MB | 0 %]
        [FILE] store.ts [0.33 KB | 0.0003 MB | 0 %]
    [DIR] shared
        [FILE] config-schema.ts [18.63 KB | 0.0182 MB | 0 %]
        [FILE] constants.ts [0.23 KB | 0.0002 MB | 0 %]
        [FILE] enums.ts [21.93 KB | 0.0214 MB | 0 %]
        [FILE] i18n-complete.ts [22.92 KB | 0.0224 MB | 0 %]
        [FILE] i18n.ts [0.79 KB | 0.0008 MB | 0 %]
        [FILE] localized-logger.ts [0.03 KB | 0 MB | 0 %]
        [FILE] logger.ts [17.32 KB | 0.0169 MB | 0 %]
        [FILE] settings-manager.ts [26.14 KB | 0.0255 MB | 0 %]
        [FILE] theme-manager.ts [11.92 KB | 0.0116 MB | 0 %]
        [FILE] types.ts [20.38 KB | 0.0199 MB | 0 %]
        [FILE] vip-manager.ts [14.22 KB | 0.0139 MB | 0 %]
    [DIR] tests
        [DIR] e2e
        [DIR] fixtures
        [DIR] integration
            [FILE] services-integration.test.ts [16.86 KB | 0.0165 MB | 0 %]
        [DIR] unit
            [FILE] ai.test.ts [9.39 KB | 0.0092 MB | 0 %]
            [FILE] clipboard.test.ts [12.39 KB | 0.0121 MB | 0 %]
        [FILE] ai.test.ts [1.37 KB | 0.0013 MB | 0 %]
        [FILE] clipboard.test.ts [1.1 KB | 0.0011 MB | 0 %]
        [FILE] security.test.ts [1.42 KB | 0.0014 MB | 0 %]
        [FILE] setupTests.ts [3.82 KB | 0.0037 MB | 0 %]
    [FILE] main.ts [10.79 KB | 0.0105 MB | 0 %]
    [FILE] setupTests.ts [4.83 KB | 0.0047 MB | 0 %]
[DIR] assets
    [DIR] icons
        [FILE] icon.icns [1.96 KB | 0.0019 MB | 0 %]
        [FILE] icon.ico [1.96 KB | 0.0019 MB | 0 %]
        [FILE] icon.png [1.96 KB | 0.0019 MB | 0 %]
        [FILE] tray.png [0.34 KB | 0.0003 MB | 0 %]
    [FILE] app-icon.ico [68.74 KB | 0.0671 MB | 0.01 %]
    [FILE] README-ICONS.md [8.87 KB | 0.0087 MB | 0 %]
    [FILE] splash.png [2143.6 KB | 2.0934 MB | 0.4 %]
    [FILE] tray-icon.ico [176.4 KB | 0.1723 MB | 0.03 %]
[DIR] data
[DIR] dist
    [DIR] assets
        [FILE] index.Drc8YSGq.js [321.69 KB | 0.3141 MB | 0.06 %]
        [FILE] index.fvrkdlOk.css [105.29 KB | 0.1028 MB | 0.02 %]
    [FILE] dev-unavailable.html [1.06 KB | 0.001 MB | 0 %]
    [FILE] favicon.ico [7.5 KB | 0.0073 MB | 0 %]
    [FILE] index.html [1.48 KB | 0.0014 MB | 0 %]
    [FILE] knoux-about.html [5.56 KB | 0.0054 MB | 0 %]
    [FILE] manifest.json [0.38 KB | 0.0004 MB | 0 %]
[DIR] docs
    [FILE] AI-DESIGN.md [12.99 KB | 0.0127 MB | 0 %]
    [FILE] ARCHITECTURE.md [9.21 KB | 0.009 MB | 0 %]
    [FILE] FEATURES.md [9.1 KB | 0.0089 MB | 0 %]
    [FILE] index.html [3.46 KB | 0.0034 MB | 0 %]
    [FILE] INTEGRATION-GUIDE.md [15.51 KB | 0.0151 MB | 0 %]
    [FILE] README.md [8.09 KB | 0.0079 MB | 0 %]
    [FILE] ROADMAP.md [9.49 KB | 0.0093 MB | 0 %]
    [FILE] SECURITY.md [1.55 KB | 0.0015 MB | 0 %]
[DIR] electron
    [FILE] preload.js [0.48 KB | 0.0005 MB | 0 %]
[DIR] logs
[DIR] public
    [FILE] dev-unavailable.html [1.06 KB | 0.001 MB | 0 %]
    [FILE] favicon.ico [7.5 KB | 0.0073 MB | 0 %]
    [FILE] index.html [0.84 KB | 0.0008 MB | 0 %]
    [FILE] knoux-about.html [5.56 KB | 0.0054 MB | 0 %]
    [FILE] manifest.json [0.38 KB | 0.0004 MB | 0 %]
[DIR] release
    [DIR] Knoux-Clipboard-AI-win32-x64
        [DIR] locales
            [FILE] af.pak [381.16 KB | 0.3722 MB | 0.07 %]
            [FILE] am.pak [619.79 KB | 0.6053 MB | 0.11 %]
            [FILE] ar.pak [680.06 KB | 0.6641 MB | 0.13 %]
            [FILE] bg.pak [706.79 KB | 0.6902 MB | 0.13 %]
            [FILE] bn.pak [911.61 KB | 0.8902 MB | 0.17 %]
            [FILE] ca.pak [430.66 KB | 0.4206 MB | 0.08 %]
            [FILE] cs.pak [441.41 KB | 0.4311 MB | 0.08 %]
            [FILE] da.pak [400.48 KB | 0.3911 MB | 0.07 %]
            [FILE] de.pak [427.84 KB | 0.4178 MB | 0.08 %]
            [FILE] el.pak [775.01 KB | 0.7568 MB | 0.14 %]
            [FILE] en-GB.pak [348.34 KB | 0.3402 MB | 0.06 %]
            [FILE] en-US.pak [351 KB | 0.3428 MB | 0.07 %]
            [FILE] es-419.pak [425.29 KB | 0.4153 MB | 0.08 %]
            [FILE] es.pak [425.44 KB | 0.4155 MB | 0.08 %]
            [FILE] et.pak [384.13 KB | 0.3751 MB | 0.07 %]
            [FILE] fa.pak [629.11 KB | 0.6144 MB | 0.12 %]
            [FILE] fi.pak [392.54 KB | 0.3833 MB | 0.07 %]
            [FILE] fil.pak [442.9 KB | 0.4325 MB | 0.08 %]
            [FILE] fr.pak [459.86 KB | 0.4491 MB | 0.09 %]
            [FILE] gu.pak [886.51 KB | 0.8657 MB | 0.16 %]
            [FILE] he.pak [549.68 KB | 0.5368 MB | 0.1 %]
            [FILE] hi.pak [928.1 KB | 0.9063 MB | 0.17 %]
            [FILE] hr.pak [428.12 KB | 0.4181 MB | 0.08 %]
            [FILE] hu.pak [460.98 KB | 0.4502 MB | 0.09 %]
            [FILE] id.pak [377.8 KB | 0.3689 MB | 0.07 %]
            [FILE] it.pak [417.74 KB | 0.4079 MB | 0.08 %]
            [FILE] ja.pak [510.81 KB | 0.4988 MB | 0.09 %]
            [FILE] kn.pak [1023.12 KB | 0.9991 MB | 0.19 %]
            [FILE] ko.pak [429.33 KB | 0.4193 MB | 0.08 %]
            [FILE] lt.pak [463.57 KB | 0.4527 MB | 0.09 %]
            [FILE] lv.pak [461.29 KB | 0.4505 MB | 0.09 %]
            [FILE] ml.pak [1065.88 KB | 1.0409 MB | 0.2 %]
            [FILE] mr.pak [870.88 KB | 0.8505 MB | 0.16 %]
            [FILE] ms.pak [395.37 KB | 0.3861 MB | 0.07 %]
            [FILE] nb.pak [386.74 KB | 0.3777 MB | 0.07 %]
            [FILE] nl.pak [398.73 KB | 0.3894 MB | 0.07 %]
            [FILE] pl.pak [444.99 KB | 0.4346 MB | 0.08 %]
            [FILE] pt-BR.pak [419.24 KB | 0.4094 MB | 0.08 %]
            [FILE] pt-PT.pak [420.46 KB | 0.4106 MB | 0.08 %]
            [FILE] ro.pak [434.65 KB | 0.4245 MB | 0.08 %]
            [FILE] ru.pak [711.53 KB | 0.6949 MB | 0.13 %]
            [FILE] sk.pak [448.58 KB | 0.4381 MB | 0.08 %]
            [FILE] sl.pak [433.48 KB | 0.4233 MB | 0.08 %]
            [FILE] sr.pak [666.49 KB | 0.6509 MB | 0.12 %]
            [FILE] sv.pak [389.24 KB | 0.3801 MB | 0.07 %]
            [FILE] sw.pak [408.46 KB | 0.3989 MB | 0.08 %]
            [FILE] ta.pak [1052.78 KB | 1.0281 MB | 0.2 %]
            [FILE] te.pak [973.91 KB | 0.9511 MB | 0.18 %]
            [FILE] th.pak [817.24 KB | 0.7981 MB | 0.15 %]
            [FILE] tr.pak [415.82 KB | 0.4061 MB | 0.08 %]
            [FILE] uk.pak [711.59 KB | 0.6949 MB | 0.13 %]
            [FILE] ur.pak [622.3 KB | 0.6077 MB | 0.12 %]
            [FILE] vi.pak [492.32 KB | 0.4808 MB | 0.09 %]
            [FILE] zh-CN.pak [357.36 KB | 0.349 MB | 0.07 %]
            [FILE] zh-TW.pak [353.23 KB | 0.345 MB | 0.07 %]
        [DIR] resources
            [DIR] app
                [DIR] app
                    [DIR] backend
                        [DIR] ai
                            [FILE] ai-database.ts [20.02 KB | 0.0196 MB | 0 %]
                            [FILE] ai-engine.ts [26.35 KB | 0.0257 MB | 0 %]
                            [FILE] classifier.ts [30.32 KB | 0.0296 MB | 0.01 %]
                            [FILE] enhancer.ts [24.77 KB | 0.0242 MB | 0 %]
                            [FILE] prompt-library.ts [26.4 KB | 0.0258 MB | 0 %]
                            [FILE] summarizer.ts [32.13 KB | 0.0314 MB | 0.01 %]
                        [DIR] clipboard
                            [FILE] formatter.ts [25.81 KB | 0.0252 MB | 0 %]
                            [FILE] history-store.ts [25.23 KB | 0.0246 MB | 0 %]
                            [FILE] normalizer.ts [22.46 KB | 0.0219 MB | 0 %]
                            [FILE] watcher.ts [25.75 KB | 0.0251 MB | 0 %]
                        [DIR] ipc
                            [FILE] handlers.ts [9.7 KB | 0.0095 MB | 0 %]
                        [DIR] main
                            [FILE] lifecycle.ts [23.92 KB | 0.0234 MB | 0 %]
                            [FILE] main.ts [4.94 KB | 0.0048 MB | 0 %]
                            [FILE] preload.js [1.88 KB | 0.0018 MB | 0 %]
                            [FILE] preload.ts [30.75 KB | 0.03 MB | 0.01 %]
                            [FILE] tray.ts [15.73 KB | 0.0154 MB | 0 %]
                            [FILE] window-manager.ts [15.71 KB | 0.0153 MB | 0 %]
                        [DIR] security
                            [FILE] encryptor.ts [3.33 KB | 0.0033 MB | 0 %]
                            [FILE] permission-guard.ts [2.29 KB | 0.0022 MB | 0 %]
                            [FILE] sandbox.ts [1.46 KB | 0.0014 MB | 0 %]
                            [FILE] security-manager.ts [11.92 KB | 0.0116 MB | 0 %]
                            [FILE] sensitive-detector.ts [2.73 KB | 0.0027 MB | 0 %]
                        [DIR] storage
                            [FILE] cache.ts [2.05 KB | 0.002 MB | 0 %]
                            [FILE] export-import.ts [1.31 KB | 0.0013 MB | 0 %]
                            [FILE] local-db.ts [2.68 KB | 0.0026 MB | 0 %]
                        [DIR] system
                            [FILE] autostart.ts [0.9 KB | 0.0009 MB | 0 %]
                            [FILE] os-detector.ts [0.61 KB | 0.0006 MB | 0 %]
                            [FILE] updater.ts [2.01 KB | 0.002 MB | 0 %]
                        [FILE] init.ts [0.58 KB | 0.0006 MB | 0 %]
                        [FILE] integration-test.ts [9.81 KB | 0.0096 MB | 0 %]
                        [FILE] service-integration.ts [12.26 KB | 0.012 MB | 0 %]
                        [FILE] service-manager.ts [9.91 KB | 0.0097 MB | 0 %]
                    [DIR] renderer
                        [DIR] components
                            [DIR] settings
                                [FILE] GeneralSettings.tsx [5.75 KB | 0.0056 MB | 0 %]
                            [FILE] AboutKnoux.tsx [19.58 KB | 0.0191 MB | 0 %]
                            [FILE] AIProcessor.tsx [43.48 KB | 0.0425 MB | 0.01 %]
                            [FILE] AppInfo.tsx [9.78 KB | 0.0096 MB | 0 %]
                            [FILE] ClipboardItem.tsx [10.42 KB | 0.0102 MB | 0 %]
                            [FILE] ClipboardList.tsx [18.59 KB | 0.0182 MB | 0 %]
                            [FILE] ClipboardPreview.tsx [11.86 KB | 0.0116 MB | 0 %]
                            [FILE] ClipboardView.tsx [38.98 KB | 0.0381 MB | 0.01 %]
                            [FILE] DashboardFeatures.tsx [11.83 KB | 0.0116 MB | 0 %]
                            [FILE] ErrorBoundary.tsx [1.37 KB | 0.0013 MB | 0 %]
                            [FILE] FilterPanel.tsx [15.61 KB | 0.0152 MB | 0 %]
                            [FILE] HistoryTimeline.tsx [1.42 KB | 0.0014 MB | 0 %]
                            [FILE] Layout.tsx [0.51 KB | 0.0005 MB | 0 %]
                            [FILE] LoadingOverlay.tsx [0.57 KB | 0.0006 MB | 0 %]
                            [FILE] LoadingScreen.tsx [0.96 KB | 0.0009 MB | 0 %]
                            [FILE] SearchBar.tsx [33.43 KB | 0.0326 MB | 0.01 %]
                            [FILE] SettingsPanel.tsx [4.99 KB | 0.0049 MB | 0 %]
                            [FILE] Sidebar.tsx [2.02 KB | 0.002 MB | 0 %]
                            [FILE] SplashScreen.tsx [3.06 KB | 0.003 MB | 0 %]
                            [FILE] SystemBar.tsx [10.42 KB | 0.0102 MB | 0 %]
                            [FILE] TagManager.tsx [1.92 KB | 0.0019 MB | 0 %]
                        [DIR] containers
                            [FILE] UnifiedAppContainer.tsx [6.74 KB | 0.0066 MB | 0 %]
                        [DIR] contexts
                            [FILE] AIContext.tsx [0.59 KB | 0.0006 MB | 0 %]
                            [FILE] ClipboardContext.tsx [2.59 KB | 0.0025 MB | 0 %]
                            [FILE] NotificationContext.tsx [2.31 KB | 0.0023 MB | 0 %]
                            [FILE] SettingsContext.tsx [0.98 KB | 0.001 MB | 0 %]
                            [FILE] ThemeContext.tsx [1.33 KB | 0.0013 MB | 0 %]
                        [DIR] hooks
                            [FILE] useAI.ts [26.01 KB | 0.0254 MB | 0 %]
                            [FILE] useAIFixed.ts [18.8 KB | 0.0184 MB | 0 %]
                            [FILE] useClipboard.ts [9.97 KB | 0.0097 MB | 0 %]
                            [FILE] useSearch.ts [11.52 KB | 0.0112 MB | 0 %]
                            [FILE] useSettings.ts [18.52 KB | 0.0181 MB | 0 %]
                        [DIR] services
                            [FILE] ClipboardService.ts [6.03 KB | 0.0059 MB | 0 %]
                            [FILE] initialization.ts [0.23 KB | 0.0002 MB | 0 %]
                        [DIR] styles
                            [FILE] animations.css [14.14 KB | 0.0138 MB | 0 %]
                            [FILE] global.css [7.65 KB | 0.0075 MB | 0 %]
                            [FILE] theme-dark.css [9.01 KB | 0.0088 MB | 0 %]
                            [FILE] theme-light.css [10.67 KB | 0.0104 MB | 0 %]
                            [FILE] theme.ts [0.69 KB | 0.0007 MB | 0 %]
                        [DIR] utils
                            [FILE] helpers.ts [9.22 KB | 0.009 MB | 0 %]
                        [DIR] views
                            [FILE] About.tsx [24.34 KB | 0.0238 MB | 0 %]
                            [FILE] AIInsights.tsx [33.25 KB | 0.0325 MB | 0.01 %]
                            [FILE] ClipboardHistory.tsx [29.68 KB | 0.029 MB | 0.01 %]
                            [FILE] Dashboard.tsx [15.5 KB | 0.0151 MB | 0 %]
                            [FILE] KnouxAbout.css [6.03 KB | 0.0059 MB | 0 %]
                            [FILE] KnouxAbout.html [13.45 KB | 0.0131 MB | 0 %]
                            [FILE] KnouxAbout.tsx [5.34 KB | 0.0052 MB | 0 %]
                            [FILE] SecurityCenter.tsx [22.66 KB | 0.0221 MB | 0 %]
                        [FILE] App.tsx [18.89 KB | 0.0184 MB | 0 %]
                        [FILE] AppIntegrated.tsx [19.46 KB | 0.019 MB | 0 %]
                        [FILE] index.html [1.38 KB | 0.0014 MB | 0 %]
                        [FILE] index.tsx [0.28 KB | 0.0003 MB | 0 %]
                        [FILE] main.tsx [0.47 KB | 0.0005 MB | 0 %]
                        [FILE] store.ts [0.33 KB | 0.0003 MB | 0 %]
                    [DIR] shared
                        [FILE] config-schema.ts [18.63 KB | 0.0182 MB | 0 %]
                        [FILE] constants.ts [16.64 KB | 0.0162 MB | 0 %]
                        [FILE] enums.ts [21.93 KB | 0.0214 MB | 0 %]
                        [FILE] i18n-complete.ts [22.92 KB | 0.0224 MB | 0 %]
                        [FILE] i18n.ts [0.79 KB | 0.0008 MB | 0 %]
                        [FILE] localized-logger.ts [0.46 KB | 0.0004 MB | 0 %]
                        [FILE] logger.ts [17.36 KB | 0.017 MB | 0 %]
                        [FILE] settings-manager.ts [26.14 KB | 0.0255 MB | 0 %]
                        [FILE] theme-manager.ts [11.92 KB | 0.0116 MB | 0 %]
                        [FILE] types.ts [20.38 KB | 0.0199 MB | 0 %]
                        [FILE] vip-manager.ts [14.22 KB | 0.0139 MB | 0 %]
                    [DIR] tests
                        [DIR] e2e
                        [DIR] fixtures
                        [DIR] integration
                            [FILE] services-integration.test.ts [16.86 KB | 0.0165 MB | 0 %]
                        [DIR] unit
                            [FILE] ai.test.ts [9.39 KB | 0.0092 MB | 0 %]
                            [FILE] clipboard.test.ts [12.39 KB | 0.0121 MB | 0 %]
                        [FILE] ai.test.ts [1.37 KB | 0.0013 MB | 0 %]
                        [FILE] clipboard.test.ts [1.1 KB | 0.0011 MB | 0 %]
                        [FILE] security.test.ts [1.42 KB | 0.0014 MB | 0 %]
                        [FILE] setupTests.ts [3.82 KB | 0.0037 MB | 0 %]
                    [FILE] main.ts [10.77 KB | 0.0105 MB | 0 %]
                    [FILE] setupTests.ts [4.83 KB | 0.0047 MB | 0 %]
                [DIR] assets
                    [DIR] icons
                        [FILE] icon.icns [1.96 KB | 0.0019 MB | 0 %]
                        [FILE] icon.ico [1.96 KB | 0.0019 MB | 0 %]
                        [FILE] icon.png [1.96 KB | 0.0019 MB | 0 %]
                        [FILE] tray.png [0.34 KB | 0.0003 MB | 0 %]
                    [FILE] app-icon.ico [68.74 KB | 0.0671 MB | 0.01 %]
                    [FILE] README-ICONS.md [8.87 KB | 0.0087 MB | 0 %]
                    [FILE] splash.png [2143.6 KB | 2.0934 MB | 0.4 %]
                    [FILE] tray-icon.ico [176.4 KB | 0.1723 MB | 0.03 %]
                [DIR] data
                [DIR] dist
                    [DIR] assets
                        [FILE] index.BchlZwWh.css [111.83 KB | 0.1092 MB | 0.02 %]
                        [FILE] index.kPkoA7P3.js [185.58 KB | 0.1812 MB | 0.03 %]
                    [FILE] dev-unavailable.html [1.06 KB | 0.001 MB | 0 %]
                    [FILE] favicon.ico [7.5 KB | 0.0073 MB | 0 %]
                    [FILE] ffmpeg.dll [2812.5 KB | 2.7466 MB | 0.52 %]
                    [FILE] index.html [1.48 KB | 0.0014 MB | 0 %]
                    [FILE] knoux-about.html [5.56 KB | 0.0054 MB | 0 %]
                    [FILE] manifest.json [0.38 KB | 0.0004 MB | 0 %]
                [DIR] docs
                    [FILE] AI-DESIGN.md [12.99 KB | 0.0127 MB | 0 %]
                    [FILE] ARCHITECTURE.md [9.21 KB | 0.009 MB | 0 %]
                    [FILE] FEATURES.md [9.1 KB | 0.0089 MB | 0 %]
                    [FILE] index.html [3.46 KB | 0.0034 MB | 0 %]
                    [FILE] INTEGRATION-GUIDE.md [15.51 KB | 0.0151 MB | 0 %]
                    [FILE] README.md [8.09 KB | 0.0079 MB | 0 %]
                    [FILE] ROADMAP.md [9.49 KB | 0.0093 MB | 0 %]
                    [FILE] SECURITY.md [1.55 KB | 0.0015 MB | 0 %]
                [DIR] electron
                    [FILE] preload.js [0.48 KB | 0.0005 MB | 0 %]
                [DIR] logs
                [DIR] public
                    [FILE] dev-unavailable.html [1.06 KB | 0.001 MB | 0 %]
                    [FILE] favicon.ico [7.5 KB | 0.0073 MB | 0 %]
                    [FILE] index.html [0.84 KB | 0.0008 MB | 0 %]
                    [FILE] knoux-about.html [5.56 KB | 0.0054 MB | 0 %]
                    [FILE] manifest.json [0.38 KB | 0.0004 MB | 0 %]
                [DIR] scripts
                    [FILE] analyze-code.js [10.11 KB | 0.0099 MB | 0 %]
                    [FILE] dev-run.md [4.39 KB | 0.0043 MB | 0 %]
                    [FILE] doctor.js [1.91 KB | 0.0019 MB | 0 %]
                    [FILE] enhance-docs.js [6.3 KB | 0.0062 MB | 0 %]
                    [FILE] generate-assets.ps1 [2.84 KB | 0.0028 MB | 0 %]
                    [FILE] packaging-flow.md [13.02 KB | 0.0127 MB | 0 %]
                    [FILE] recovery-guide.md [13.23 KB | 0.0129 MB | 0 %]
                    [FILE] run-dev.js [4.02 KB | 0.0039 MB | 0 %]
                [DIR] setup
                    [DIR] assets
                    [FILE] knoux.nsi [7.3 KB | 0.0071 MB | 0 %]
                    [FILE] prepare.ps1 [6.51 KB | 0.0064 MB | 0 %]
                    [FILE] README.md [7.09 KB | 0.0069 MB | 0 %]
                    [FILE] verify.py [6.89 KB | 0.0067 MB | 0 %]
                [DIR] src
                    [FILE] App.css [2.41 KB | 0.0024 MB | 0 %]
                    [FILE] App.tsx [1.77 KB | 0.0017 MB | 0 %]
                    [FILE] index.css [0.36 KB | 0.0003 MB | 0 %]
                    [FILE] index.tsx [0.27 KB | 0.0003 MB | 0 %]
                    [FILE] react-app-env.d.ts [0.72 KB | 0.0007 MB | 0 %]
                    [FILE] setupTests.ts [0.24 KB | 0.0002 MB | 0 %]
                [DIR] userdata
                [FILE] .env [0.14 KB | 0.0001 MB | 0 %]
                [FILE] .env.development [0.14 KB | 0.0001 MB | 0 %]
                [FILE] .env.example [0.68 KB | 0.0007 MB | 0 %]
                [FILE] .eslintrc.json [3.22 KB | 0.0031 MB | 0 %]
                [FILE] .npmrc [0.18 KB | 0.0002 MB | 0 %]
                [FILE] bridge.js [0.16 KB | 0.0002 MB | 0 %]
                [FILE] CONTRIBUTING.md [6.09 KB | 0.0059 MB | 0 %]
                [FILE] craco.config.js [4.65 KB | 0.0045 MB | 0 %]
                [FILE] electron-builder.yml [1.65 KB | 0.0016 MB | 0 %]
                [FILE] electron.tsconfig.json [1 KB | 0.001 MB | 0 %]
                [FILE] FINAL-STATUS.txt [13.04 KB | 0.0127 MB | 0 %]
                [FILE] FINAL-SUMMARY.txt [16.53 KB | 0.0161 MB | 0 %]
                [FILE] global.d.ts [1 KB | 0.001 MB | 0 %]
                [FILE] HOW-TO-USE.md [3.93 KB | 0.0038 MB | 0 %]
                [FILE] INSTALLATION.md [11.04 KB | 0.0108 MB | 0 %]
                [FILE] KNOUX.signature [0 KB | 0 MB | 0 %]
                [FILE] LICENSE [1.05 KB | 0.001 MB | 0 %]
                [FILE] main.js [3.48 KB | 0.0034 MB | 0 %]
                [FILE] package-simple.json [0.38 KB | 0.0004 MB | 0 %]
                [FILE] package.json [1.42 KB | 0.0014 MB | 0 %]
                [FILE] postcss.config.js [0.07 KB | 0.0001 MB | 0 %]
                [FILE] preload.js [0.55 KB | 0.0005 MB | 0 %]
                [FILE] PROJECT-STRUCTURE.md [6.66 KB | 0.0065 MB | 0 %]
                [FILE] QUICK-START.txt [3.19 KB | 0.0031 MB | 0 %]
                [FILE] README.md [6.48 KB | 0.0063 MB | 0 %]
                [FILE] RELEASES.md [6.92 KB | 0.0068 MB | 0 %]
                [FILE] ROOT-CAUSE-ANALYSIS.md [6.23 KB | 0.0061 MB | 0 %]
                [FILE] run.bat [0.78 KB | 0.0008 MB | 0 %]
                [FILE] run.sh [0.65 KB | 0.0006 MB | 0 %]
                [FILE] SETUP-COMPLETE.txt [19.8 KB | 0.0193 MB | 0 %]
                [FILE] SETUP-SUMMARY.md [12.89 KB | 0.0126 MB | 0 %]
                [FILE] tailwind.config.js [5.03 KB | 0.0049 MB | 0 %]
                [FILE] tsconfig.fixed.json [0.94 KB | 0.0009 MB | 0 %]
                [FILE] tsconfig.json [1.79 KB | 0.0018 MB | 0 %]
                [FILE] vite.config.ts [2.11 KB | 0.0021 MB | 0 %]
        [FILE] chrome_100_percent.pak [132.77 KB | 0.1297 MB | 0.02 %]
        [FILE] chrome_200_percent.pak [191.34 KB | 0.1869 MB | 0.04 %]
        [FILE] d3dcompiler_47.dll [4801.48 KB | 4.6889 MB | 0.89 %]
        [FILE] ffmpeg.dll [2812.5 KB | 2.7466 MB | 0.52 %]
        [FILE] icudtl.dat [10297.73 KB | 10.0564 MB | 1.91 %]
        [FILE] Knoux-Clipboard-AI.exe [159469.5 KB | 155.7319 MB | 29.58 %]
        [FILE] libEGL.dll [469 KB | 0.458 MB | 0.09 %]
        [FILE] libGLESv2.dll [7245 KB | 7.0752 MB | 1.34 %]
        [FILE] LICENSE [1.07 KB | 0.001 MB | 0 %]
        [FILE] LICENSES.chromium.html [8052.46 KB | 7.8637 MB | 1.49 %]
        [FILE] resources.pak [5072.12 KB | 4.9532 MB | 0.94 %]
        [FILE] snapshot_blob.bin [253.13 KB | 0.2472 MB | 0.05 %]
        [FILE] v8_context_snapshot.bin [564.49 KB | 0.5513 MB | 0.1 %]
        [FILE] version [0.01 KB | 0 MB | 0 %]
        [FILE] vk_swiftshader_icd.json [0.1 KB | 0.0001 MB | 0 %]
        [FILE] vk_swiftshader.dll [5128 KB | 5.0078 MB | 0.95 %]
        [FILE] vulkan-1.dll [910 KB | 0.8887 MB | 0.17 %]
    [DIR] win-unpacked
        [DIR] locales
            [FILE] af.pak [381.16 KB | 0.3722 MB | 0.07 %]
            [FILE] am.pak [619.79 KB | 0.6053 MB | 0.11 %]
            [FILE] ar.pak [680.06 KB | 0.6641 MB | 0.13 %]
            [FILE] bg.pak [706.79 KB | 0.6902 MB | 0.13 %]
            [FILE] bn.pak [911.61 KB | 0.8902 MB | 0.17 %]
            [FILE] ca.pak [430.66 KB | 0.4206 MB | 0.08 %]
            [FILE] cs.pak [441.41 KB | 0.4311 MB | 0.08 %]
            [FILE] da.pak [400.48 KB | 0.3911 MB | 0.07 %]
            [FILE] de.pak [427.84 KB | 0.4178 MB | 0.08 %]
            [FILE] el.pak [775.01 KB | 0.7568 MB | 0.14 %]
            [FILE] en-GB.pak [348.34 KB | 0.3402 MB | 0.06 %]
            [FILE] en-US.pak [351 KB | 0.3428 MB | 0.07 %]
            [FILE] es-419.pak [425.29 KB | 0.4153 MB | 0.08 %]
            [FILE] es.pak [425.44 KB | 0.4155 MB | 0.08 %]
            [FILE] et.pak [384.13 KB | 0.3751 MB | 0.07 %]
            [FILE] fa.pak [629.11 KB | 0.6144 MB | 0.12 %]
            [FILE] fi.pak [392.54 KB | 0.3833 MB | 0.07 %]
            [FILE] fil.pak [442.9 KB | 0.4325 MB | 0.08 %]
            [FILE] fr.pak [459.86 KB | 0.4491 MB | 0.09 %]
            [FILE] gu.pak [886.51 KB | 0.8657 MB | 0.16 %]
            [FILE] he.pak [549.68 KB | 0.5368 MB | 0.1 %]
            [FILE] hi.pak [928.1 KB | 0.9063 MB | 0.17 %]
            [FILE] hr.pak [428.12 KB | 0.4181 MB | 0.08 %]
            [FILE] hu.pak [460.98 KB | 0.4502 MB | 0.09 %]
            [FILE] id.pak [377.8 KB | 0.3689 MB | 0.07 %]
            [FILE] it.pak [417.74 KB | 0.4079 MB | 0.08 %]
            [FILE] ja.pak [510.81 KB | 0.4988 MB | 0.09 %]
            [FILE] kn.pak [1023.12 KB | 0.9991 MB | 0.19 %]
            [FILE] ko.pak [429.33 KB | 0.4193 MB | 0.08 %]
            [FILE] lt.pak [463.57 KB | 0.4527 MB | 0.09 %]
            [FILE] lv.pak [461.29 KB | 0.4505 MB | 0.09 %]
            [FILE] ml.pak [1065.88 KB | 1.0409 MB | 0.2 %]
            [FILE] mr.pak [870.88 KB | 0.8505 MB | 0.16 %]
            [FILE] ms.pak [395.37 KB | 0.3861 MB | 0.07 %]
            [FILE] nb.pak [386.74 KB | 0.3777 MB | 0.07 %]
            [FILE] nl.pak [398.73 KB | 0.3894 MB | 0.07 %]
            [FILE] pl.pak [444.99 KB | 0.4346 MB | 0.08 %]
            [FILE] pt-BR.pak [419.24 KB | 0.4094 MB | 0.08 %]
            [FILE] pt-PT.pak [420.46 KB | 0.4106 MB | 0.08 %]
            [FILE] ro.pak [434.65 KB | 0.4245 MB | 0.08 %]
            [FILE] ru.pak [711.53 KB | 0.6949 MB | 0.13 %]
            [FILE] sk.pak [448.58 KB | 0.4381 MB | 0.08 %]
            [FILE] sl.pak [433.48 KB | 0.4233 MB | 0.08 %]
            [FILE] sr.pak [666.49 KB | 0.6509 MB | 0.12 %]
            [FILE] sv.pak [389.24 KB | 0.3801 MB | 0.07 %]
            [FILE] sw.pak [408.46 KB | 0.3989 MB | 0.08 %]
            [FILE] ta.pak [1052.78 KB | 1.0281 MB | 0.2 %]
            [FILE] te.pak [973.91 KB | 0.9511 MB | 0.18 %]
            [FILE] th.pak [817.24 KB | 0.7981 MB | 0.15 %]
            [FILE] tr.pak [415.82 KB | 0.4061 MB | 0.08 %]
            [FILE] uk.pak [711.59 KB | 0.6949 MB | 0.13 %]
            [FILE] ur.pak [622.3 KB | 0.6077 MB | 0.12 %]
            [FILE] vi.pak [492.32 KB | 0.4808 MB | 0.09 %]
            [FILE] zh-CN.pak [357.36 KB | 0.349 MB | 0.07 %]
            [FILE] zh-TW.pak [353.23 KB | 0.345 MB | 0.07 %]
        [DIR] resources
            [DIR] app
                [DIR] dist
                    [DIR] assets
                        [FILE] index.Drc8YSGq.js [321.69 KB | 0.3141 MB | 0.06 %]
                        [FILE] index.fvrkdlOk.css [105.29 KB | 0.1028 MB | 0.02 %]
                    [FILE] dev-unavailable.html [1.06 KB | 0.001 MB | 0 %]
                    [FILE] favicon.ico [7.5 KB | 0.0073 MB | 0 %]
                    [FILE] index.html [1.48 KB | 0.0014 MB | 0 %]
                    [FILE] knoux-about.html [5.56 KB | 0.0054 MB | 0 %]
                    [FILE] manifest.json [0.38 KB | 0.0004 MB | 0 %]
                [FILE] main.js [3.48 KB | 0.0034 MB | 0 %]
                [FILE] package.json [0.65 KB | 0.0006 MB | 0 %]
            [FILE] app-update.yml [0.12 KB | 0.0001 MB | 0 %]
            [FILE] elevate.exe [105 KB | 0.1025 MB | 0.02 %]
        [FILE] chrome_100_percent.pak [132.77 KB | 0.1297 MB | 0.02 %]
        [FILE] chrome_200_percent.pak [191.34 KB | 0.1869 MB | 0.04 %]
        [FILE] d3dcompiler_47.dll [4801.48 KB | 4.6889 MB | 0.89 %]
        [FILE] ffmpeg.dll [2812.5 KB | 2.7466 MB | 0.52 %]
        [FILE] icudtl.dat [10297.73 KB | 10.0564 MB | 1.91 %]
        [FILE] Knoux Clipboard AI.exe [159565 KB | 155.8252 MB | 29.59 %]
        [FILE] libEGL.dll [469 KB | 0.458 MB | 0.09 %]
        [FILE] libGLESv2.dll [7245 KB | 7.0752 MB | 1.34 %]
        [FILE] LICENSE.electron.txt [1.07 KB | 0.001 MB | 0 %]
        [FILE] LICENSES.chromium.html [8052.46 KB | 7.8637 MB | 1.49 %]
        [FILE] resources.pak [5072.12 KB | 4.9532 MB | 0.94 %]
        [FILE] snapshot_blob.bin [253.13 KB | 0.2472 MB | 0.05 %]
        [FILE] v8_context_snapshot.bin [564.49 KB | 0.5513 MB | 0.1 %]
        [FILE] vk_swiftshader_icd.json [0.1 KB | 0.0001 MB | 0 %]
        [FILE] vk_swiftshader.dll [5128 KB | 5.0078 MB | 0.95 %]
        [FILE] vulkan-1.dll [910 KB | 0.8887 MB | 0.17 %]
    [FILE] knoux-clipboard-ai-1.0.0-x64.nsis.7z [55290.92 KB | 53.995 MB | 10.25 %]
[DIR] scripts
    [FILE] analyze-code.js [10.11 KB | 0.0099 MB | 0 %]
    [FILE] dev-run.md [4.39 KB | 0.0043 MB | 0 %]
    [FILE] doctor.js [1.91 KB | 0.0019 MB | 0 %]
    [FILE] enhance-docs.js [6.3 KB | 0.0062 MB | 0 %]
    [FILE] generate-assets.ps1 [2.84 KB | 0.0028 MB | 0 %]
    [FILE] packaging-flow.md [13.02 KB | 0.0127 MB | 0 %]
    [FILE] recovery-guide.md [13.23 KB | 0.0129 MB | 0 %]
    [FILE] run-dev.js [4.02 KB | 0.0039 MB | 0 %]
[DIR] setup
    [DIR] assets
    [FILE] knoux.nsi [7.3 KB | 0.0071 MB | 0 %]
    [FILE] prepare.ps1 [6.51 KB | 0.0064 MB | 0 %]
    [FILE] README.md [7.09 KB | 0.0069 MB | 0 %]
    [FILE] verify.py [6.89 KB | 0.0067 MB | 0 %]
[DIR] userdata
[FILE] _PROJECT_TREE_CLEAN.txt [25.59 KB | 0.025 MB | 0 %]
[FILE] _ProjectTree.txt [0 KB | 0 MB | 0 %]
[FILE] .env [0.14 KB | 0.0001 MB | 0 %]
[FILE] .env.development [0.14 KB | 0.0001 MB | 0 %]
[FILE] .env.example [0.68 KB | 0.0007 MB | 0 %]
[FILE] .eslintrc.json [3.22 KB | 0.0031 MB | 0 %]
[FILE] .npmrc [0.18 KB | 0.0002 MB | 0 %]
[FILE] bridge.js [0.16 KB | 0.0002 MB | 0 %]
[FILE] CONTRIBUTING.md [6.09 KB | 0.0059 MB | 0 %]
[FILE] craco.config.js [4.65 KB | 0.0045 MB | 0 %]
[FILE] electron-builder.yml [1.68 KB | 0.0016 MB | 0 %]
[FILE] electron.tsconfig.json [1 KB | 0.001 MB | 0 %]
[FILE] global.d.ts [1 KB | 0.001 MB | 0 %]
[FILE] HOW-TO-USE.md [3.93 KB | 0.0038 MB | 0 %]
[FILE] INSTALLATION.md [11.04 KB | 0.0108 MB | 0 %]
[FILE] KNOUX.signature [0 KB | 0 MB | 0 %]
[FILE] LICENSE [1.05 KB | 0.001 MB | 0 %]
[FILE] main.js [3.48 KB | 0.0034 MB | 0 %]
[FILE] package-lock.json [319.41 KB | 0.3119 MB | 0.06 %]
[FILE] package-simple.json [0.38 KB | 0.0004 MB | 0 %]
[FILE] package.json [1.48 KB | 0.0014 MB | 0 %]
[FILE] postcss.config.js [0.07 KB | 0.0001 MB | 0 %]
[FILE] preload.js [0.55 KB | 0.0005 MB | 0 %]
[FILE] PROJECT-STRUCTURE.md [6.66 KB | 0.0065 MB | 0 %]
[FILE] README.md [6.48 KB | 0.0063 MB | 0 %]
[FILE] RELEASES.md [6.92 KB | 0.0068 MB | 0 %]
[FILE] ROOT-CAUSE-ANALYSIS.md [6.23 KB | 0.0061 MB | 0 %]
[FILE] run.bat [0.78 KB | 0.0008 MB | 0 %]
[FILE] run.sh [0.65 KB | 0.0006 MB | 0 %]
[FILE] SETUP-SUMMARY.md [12.89 KB | 0.0126 MB | 0 %]
[FILE] tailwind.config.js [5.03 KB | 0.0049 MB | 0 %]
[FILE] tsconfig.fixed.json [0.94 KB | 0.0009 MB | 0 %]
[FILE] tsconfig.json [1.79 KB | 0.0018 MB | 0 %]
[FILE] vite.config.ts [2.11 KB | 0.0021 MB | 0 %]
 Aisha /**
 * Knoux Clipboard AI - Electron Preload Script
 * Secure bridge between renderer and main process
 * Generated by Knoux — Abu Retaj
 * Clipboard Intelligence • Desktop Precision • Premium Engineering
 */

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPC_CHANNELS } from '../../shared/constants';
import { createLogger } from '../../shared/logger';

// ==================== TYPES ====================

/**
 * Exposed API for renderer process
 */
interface KnouxAPI {
  // System
  getPlatform: () => Promise<string>;
  setAutostart: (enabled: boolean) => Promise<{ success: boolean; error?: string }>;
  restartApp: () => Promise<void>;
  quitApp: () => Promise<void>;

  // Settings
  getAllSettings: () => Promise<any>;
  updateSettings: (updates: any) => Promise<{ success: boolean; error?: string }>;
  resetSettings: () => Promise<{ success: boolean; error?: string }>;
  exportSettings: () => Promise<{ success: boolean; data?: string; error?: string }>;
  importSettings: (data: string) => Promise<{ success: boolean; error?: string }>;

  // Clipboard
  getClipboardHistory: (options?: any) => Promise<any[]>;
  addClipboardItem: (item: any) => Promise<{ success: boolean; id?: string; error?: string }>;
  deleteClipboardItem: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateClipboardItem: (id: string, updates: any) => Promise<{ success: boolean; error?: string }>;
  clearClipboardHistory: () => Promise<{ success: boolean; error?: string }>;

  // AI
  analyzeContent: (content: string, options?: any) => Promise<any>;
  getSuggestions: (content: string, context?: any) => Promise<any[]>;
  classifyContent: (content: string) => Promise<any>;
  enhancePrompt: (prompt: string) => Promise<{ success: boolean; enhanced?: string; error?: string }>;
  summarizeText: (text: string, maxLength?: number) => Promise<{ success: boolean; summary?: string; error?: string }>;

  // Security
  checkSensitive: (content: string) => Promise<any>;

  // Window Management
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
  toggleWindow: () => Promise<void>;

  // Events
  onAppEvent: (callback: (event: any) => void) => () => void;

  // Utility
  openExternal: (url: string) => Promise<void>;
  getAppVersion: () => Promise<string>;
}

// ==================== SECURITY CONFIGURATION ====================

/**
 * Allowed IPC channels for security
 */
const ALLOWED_CHANNELS = new Set([
  // System channels
  'system:getPlatform',
  'system:setAutostart',
  'system:restartApp',
  'system:quitApp',

  // Settings channels
  'settings:getAll',
  'settings:update',
  'settings:reset',

  // Clipboard channels
  'clipboard:getHistory',
  'clipboard:addItem',
  'clipboard:deleteItem',
  'clipboard:updateItem',
  'clipboard:clearHistory',

  // AI channels
  'ai:analyzeContent',
  'ai:getSuggestions',
  'ai:classifyContent',
  'ai:enhancePrompt',
  'ai:summarizeText',

  // Security channels
  'security:checkSensitive',

  // Window channels
  'window:minimize',
  'window:maximize',
  'window:close',
  'window:toggle',

  // Custom channels
  'app:sendEvent',
  'app:event',
  'shell:openExternal',
]);

/**
 * Sanitize data going to main process
 */
function sanitizeData(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle basic types
  if (typeof data !== 'object') {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  // Handle objects - remove any functions or complex objects
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    // Skip functions
    if (typeof value === 'function') {
      continue;
    }

    // Skip complex objects that aren't plain objects or arrays
    if (value !== null && typeof value === 'object') {
      const proto = Object.getPrototypeOf(value);
      if (proto !== Object.prototype && proto !== Array.prototype) {
        continue;
      }
    }

    // Recursively sanitize
    sanitized[key] = sanitizeData(value);
  }

  return sanitized;
}

/**
 * Validate IPC channel is allowed
 */
function validateChannel(channel: string): boolean {
  if (!ALLOWED_CHANNELS.has(channel)) {
    preloadLogger.warn(`Blocked attempt to access restricted IPC channel: ${channel}`);
    return false;
  }
  return true;
}

// ==================== LOGGER ====================

const preloadLogger = createLogger({ module: 'preload' });

// ==================== IPC WRAPPER FUNCTIONS ====================

/**
 * Safe IPC invoke wrapper with validation and sanitization
 */
async function safeIpcInvoke<T = any>(
  channel: string,
  ...args: any[]
): Promise<T> {
  // Validate channel
  if (!validateChannel(channel)) {
    throw new Error(`Access to IPC channel "${channel}" is not allowed`);
  }

  // Sanitize arguments
  const sanitizedArgs = args.map(sanitizeData);

  preloadLogger.debug(`IPC invoke: ${channel}`, { args: sanitizedArgs });

  try {
    const result = await ipcRenderer.invoke(channel, ...sanitizedArgs);

    // Sanitize response
    const sanitizedResult = sanitizeData(result);

    preloadLogger.debug(`IPC response: ${channel}`, { result: sanitizedResult });

    return sanitizedResult;
  } catch (error) {
    preloadLogger.error(`IPC invoke failed: ${channel}`, error as Error, { args: sanitizedArgs });
    throw error;
  }
}

/**
 * Safe IPC send wrapper
 */
function safeIpcSend(channel: string, ...args: any[]): void {
  // Validate channel
  if (!validateChannel(channel)) {
    preloadLogger.warn(`Blocked attempt to send to restricted IPC channel: ${channel}`);
    return;
  }

  // Sanitize arguments
  const sanitizedArgs = args.map(sanitizeData);

  preloadLogger.debug(`IPC send: ${channel}`, { args: sanitizedArgs });

  ipcRenderer.send(channel, ...sanitizedArgs);
}

/**
 * Safe IPC event listener wrapper
 */
function safeIpcOn(
  channel: string,
  listener: (event: IpcRendererEvent, ...args: any[]) => void
): () => void {
  // Validate channel
  if (!ALLOWED_CHANNELS.has(channel)) {
    preloadLogger.warn(`Blocked attempt to listen to restricted IPC channel: ${channel}`);
    return () => {};
  }

  // Wrap listener to sanitize arguments
  const wrappedListener = (event: IpcRendererEvent, ...args: any[]) => {
    const sanitizedArgs = args.map(sanitizeData);
    listener(event, ...sanitizedArgs);
  };

  ipcRenderer.on(channel, wrappedListener);

  // Return cleanup function
  return () => {
    ipcRenderer.off(channel, wrappedListener);
  };
}

// ==================== EXPOSED API IMPLEMENTATION ====================

const knouxAPI: KnouxAPI = {
  // ========== System Methods ==========
  getPlatform: () => safeIpcInvoke<string>('system:getPlatform'),

  setAutostart: (enabled: boolean) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      'system:setAutostart',
      enabled
    ),

  restartApp: () => safeIpcInvoke<void>('system:restartApp'),

  quitApp: () => safeIpcInvoke<void>('system:quitApp'),

  // ========== Settings Methods ==========
  getAllSettings: () => safeIpcInvoke<any>('settings:getAll'),

  updateSettings: (updates: any) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      'settings:update',
      updates
    ),

  resetSettings: () =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      'settings:reset'
    ),

  exportSettings: () =>
    safeIpcInvoke<{ success: boolean; data?: string; error?: string }>(
      'settings:export'
    ),

  importSettings: (data: string) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      'settings:import',
      data
    ),

  // ========== Clipboard Methods ==========
  getClipboardHistory: (options?: any) =>
    safeIpcInvoke<any[]>(
      'clipboard:getHistory',
      options
    ),

  addClipboardItem: (item: any) =>
    safeIpcInvoke<{ success: boolean; id?: string; error?: string }>(
      'clipboard:addItem',
      item
    ),

  deleteClipboardItem: (id: string) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      'clipboard:deleteItem',
      id
    ),

  updateClipboardItem: (id: string, updates: any) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      'clipboard:updateItem',
      id,
      updates
    ),

  clearClipboardHistory: () =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      'clipboard:clearHistory'
    ),

  // ========== AI Methods ==========
  analyzeContent: (content: string, options?: any) =>
    safeIpcInvoke<any>(
      'ai:analyzeContent',
      content,
      options
    ),

  getSuggestions: (content: string, context?: any) =>
    safeIpcInvoke<any[]>(
      'ai:getSuggestions',
      content,
      context
    ),

  classifyContent: (content: string) =>
    safeIpcInvoke<any>(
      'ai:classifyContent',
      content
    ),

  enhancePrompt: (prompt: string) =>
    safeIpcInvoke<{ success: boolean; enhanced?: string; error?: string }>(
      'ai:enhancePrompt',
      prompt
    ),

  summarizeText: (text: string, maxLength?: number) =>
    safeIpcInvoke<{ success: boolean; summary?: string; error?: string }>(
      'ai:summarizeText',
      text,
      maxLength
    ),

  // ========== Security Methods ==========
  checkSensitive: (content: string) =>
    safeIpcInvoke<any>(
      'security:checkSensitive',
      content
    ),

  // ========== Window Management Methods ==========
  minimizeWindow: () => safeIpcInvoke<void>('window:minimize'),

  maximizeWindow: () => safeIpcInvoke<void>('window:maximize'),

  closeWindow: () => safeIpcInvoke<void>('window:close'),

  toggleWindow: () => safeIpcInvoke<void>('window:toggle'),

  // ========== Event Methods ==========
  onAppEvent: (callback: (event: any) => void) => {
    const unsubscribe = safeIpcOn('app:event', (event, appEvent) => {
      callback(appEvent);
    });

    return unsubscribe;
  },

  // ========== Utility Methods ==========
  openExternal: async (url: string) => {
    // Validate URL for security
    try {
      const parsedUrl = new URL(url);

      // Only allow http/https protocols
      if (!parsedUrl.protocol.startsWith('http')) {
        throw new Error('Invalid protocol');
      }

      safeIpcSend('shell:openExternal', url);
    } catch (error) {
      preloadLogger.warn('Blocked attempt to open invalid URL', { url });
      throw new Error('Invalid URL');
    }
  },

  getAppVersion: async () => {
    const version = await ipcRenderer.invoke('app:getVersion');
    return version || 'unknown';
  },
};

// ==================== CONTEXT BRIDGE SETUP ====================

/**
 * Validate context bridge exposure
 */
function validateContextBridge(): boolean {
  // Check if we're in the right context
  if (typeof contextBridge === 'undefined') {
    preloadLogger.error('contextBridge is not available');
    return false;
  }

  // Check if we're in a preload script
  if (typeof window === 'undefined') {
    preloadLogger.error('window is not available');
    return false;
  }

  return true;
}

/**
 * Setup context bridge with the exposed API
 */
function setupContextBridge(): void {
  if (!validateContextBridge()) {
    preloadLogger.error('Failed to setup context bridge');
    return;
  }

  try {
    // Expose the API to the renderer process
    contextBridge.exposeInMainWorld('knoux', knouxAPI);

    // Also expose a simplified logger for renderer
    contextBridge.exposeInMainWorld('knouxLogger', {
      debug: (message: string, data?: any) =>
        preloadLogger.debug(`[Renderer] ${message}`, data),
      info: (message: string, data?: any) =>
        preloadLogger.info(`[Renderer] ${message}`, data),
      warn: (message: string, data?: any) =>
        preloadLogger.warn(`[Renderer] ${message}`, data),
      error: (message: string, error?: Error, data?: any) =>
        preloadLogger.error(`[Renderer] ${message}`, error, data),
    });

    preloadLogger.info('Context bridge setup completed successfully');

  } catch (error) {
    preloadLogger.error('Failed to expose API via context bridge', error as Error);
  }
}

// ==================== SECURITY CHECKS ====================

/**
 * Perform security checks before exposing API
 */
function performSecurityChecks(): void {
  // Check Node.js integration is disabled
  if ((window as any).require) {
    preloadLogger.warn('Electron require is available - verify Node.js integration is disabled');
  }

  // Check for devtools in production
  if (process.env.NODE_ENV === 'production') {
    // Limited console access in production
    const originalConsole = { ...console };

    Object.keys(console).forEach((key) => {
      if (typeof (console as any)[key] === 'function') {
        (console as any)[key] = (...args: any[]) => {
          if (process.env.DEBUG) {
            (originalConsole as any)[key](...args);
          }
        };
      }
    });
  }
}

// ==================== INITIALIZATION ====================

/**
 * Initialize the preload script
 */
function initialize(): void {
  preloadLogger.info('Preload script initializing');

  // Perform security checks
  performSecurityChecks();

  // Setup context bridge
  setupContextBridge();

  // Add global error handler for renderer
  window.addEventListener('error', (event) => {
    preloadLogger.error('Renderer unhandled error', new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    preloadLogger.error('Renderer unhandled promise rejection', new Error(String(event.reason)), {
      reason: String(event.reason),
    });
  });

  preloadLogger.info('Preload script initialized successfully');
}

// ==================== EXPORTS ====================

// Initialize on script load
initialize();

// Export types for TypeScript
export type { KnouxAPI };
export { knouxAPI };

// ==================== TYPES ====================

/**
 * Exposed API for renderer process
 */
interface KnouxAPI {
  // System
  getPlatform: () => Promise<string>;
  setAutostart: (enabled: boolean) => Promise<{ success: boolean; error?: string }>;
  restartApp: () => Promise<void>;
  quitApp: () => Promise<void>;

  // Settings
  getAllSettings: () => Promise<any>;
  updateSettings: (updates: any) => Promise<{ success: boolean; error?: string }>;
  resetSettings: () => Promise<{ success: boolean; error?: string }>;
  exportSettings: () => Promise<{ success: boolean; data?: string; error?: string }>;
  importSettings: (data: string) => Promise<{ success: boolean; error?: string }>;

  // Clipboard
  getClipboardHistory: (options?: any) => Promise<any[]>;
  addClipboardItem: (item: any) => Promise<{ success: boolean; id?: string; error?: string }>;
  deleteClipboardItem: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateClipboardItem: (id: string, updates: any) => Promise<{ success: boolean; error?: string }>;
  clearClipboardHistory: () => Promise<{ success: boolean; error?: string }>;
  exportClipboardData: (options?: any) => Promise<{ success: boolean; data?: any; error?: string }>;
  importClipboardData: (data: any) => Promise<{ success: boolean; error?: string }>;

  // AI
  analyzeContent: (content: string, options?: any) => Promise<any>;
  getSuggestions: (content: string, context?: any) => Promise<any[]>;
  classifyContent: (content: string) => Promise<any>;
  enhancePrompt: (prompt: string) => Promise<{ success: boolean; enhanced?: string; error?: string }>;
  summarizeText: (text: string, maxLength?: number) => Promise<{ success: boolean; summary?: string; error?: string }>;

  // Security
  checkSensitive: (content: string) => Promise<any>;
  encryptData: (data: string, options?: any) => Promise<{ success: boolean; encrypted?: string; error?: string }>;
  decryptData: (encrypted: string, options?: any) => Promise<{ success: boolean; decrypted?: string; error?: string }>;
  getPermissions: () => Promise<any>;

  // Window Management
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
  toggleWindow: () => Promise<void>;

  // File Dialogs
  showOpenDialog: (options: any) => Promise<any>;
  showSaveDialog: (options: any) => Promise<any>;

  // Events
  onAppEvent: (callback: (event: any) => void) => () => void;
  sendEvent: (eventType: string, data?: any) => Promise<void>;

  // Utility
  openExternal: (url: string) => Promise<void>;
  showItemInFolder: (path: string) => Promise<void>;
  getAppVersion: () => Promise<string>;
  getAppPath: () => Promise<string>;
  getUserDataPath: () => Promise<string>;
}

// ==================== SECURITY CONFIGURATION ====================

/**
 * Allowed IPC channels for security
 */
const ALLOWED_CHANNELS = new Set([
  // System channels
  IPC_CHANNELS.SYSTEM.GET_PLATFORM,
  IPC_CHANNELS.SYSTEM.SET_AUTOSTART,
  IPC_CHANNELS.SYSTEM.RESTART_APP,
  IPC_CHANNELS.SYSTEM.QUIT_APP,

  // Settings channels
  IPC_CHANNELS.SETTINGS.GET_ALL,
  IPC_CHANNELS.SETTINGS.UPDATE,
  IPC_CHANNELS.SETTINGS.RESET,
  IPC_CHANNELS.SETTINGS.EXPORT,
  IPC_CHANNELS.SETTINGS.IMPORT,

  // Clipboard channels
  IPC_CHANNELS.CLIPBOARD.GET_HISTORY,
  IPC_CHANNELS.CLIPBOARD.ADD_ITEM,
  IPC_CHANNELS.CLIPBOARD.DELETE_ITEM,
  IPC_CHANNELS.CLIPBOARD.UPDATE_ITEM,
  IPC_CHANNELS.CLIPBOARD.CLEAR_HISTORY,
  IPC_CHANNELS.CLIPBOARD.EXPORT_DATA,
  IPC_CHANNELS.CLIPBOARD.IMPORT_DATA,

  // AI channels
  IPC_CHANNELS.AI.ANALYZE_CONTENT,
  IPC_CHANNELS.AI.GET_SUGGESTIONS,
  IPC_CHANNELS.AI.CLASSIFY_CONTENT,
  IPC_CHANNELS.AI.ENHANCE_PROMPT,
  IPC_CHANNELS.AI.SUMMARIZE_TEXT,

  // Security channels
  IPC_CHANNELS.SECURITY.CHECK_SENSITIVE,
  IPC_CHANNELS.SECURITY.ENCRYPT_DATA,
  IPC_CHANNELS.SECURITY.DECRYPT_DATA,
  IPC_CHANNELS.SECURITY.GET_PERMISSIONS,

  // Custom channels
  'window:minimize',
  'window:maximize',
  'window:close',
  'window:toggle',
  'dialog:showOpenDialog',
  'dialog:showSaveDialog',
  'app:sendEvent',
]);

/**
 * Sanitize data going to main process
 */
function sanitizeData(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle basic types
  if (typeof data !== 'object') {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  // Handle objects - remove any functions or complex objects
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    // Skip functions
    if (typeof value === 'function') {
      continue;
    }

    // Skip complex objects that aren't plain objects or arrays
    if (value !== null && typeof value === 'object') {
      const proto = Object.getPrototypeOf(value);
      if (proto !== Object.prototype && proto !== Array.prototype) {
        continue;
      }
    }

    // Recursively sanitize
    sanitized[key] = sanitizeData(value);
  }

  return sanitized;
}

/**
 * Validate IPC channel is allowed
 */
function validateChannel(channel: string): boolean {
  if (!ALLOWED_CHANNELS.has(channel)) {
    llog.warn(`Blocked attempt to access restricted IPC channel: ${channel}`);
    return false;
  }
  return true;
}

// ==================== LOGGER ====================

const preloadLogger = createLogger({ module: 'preload' });

// ==================== IPC WRAPPER FUNCTIONS ====================

/**
 * Safe IPC invoke wrapper with validation and sanitization
 */
async function safeIpcInvoke<T = any>(
  channel: string,
  ...args: any[]
): Promise<T> {
  // Validate channel
  if (!validateChannel(channel)) {
    throw new Error(`Access to IPC channel "${channel}" is not allowed`);
  }

  // Sanitize arguments
  const sanitizedArgs = args.map(sanitizeData);

  preloadLogger.debug(`IPC invoke: ${channel}`, { args: sanitizedArgs });

  try {
    const result = await ipcRenderer.invoke(channel, ...sanitizedArgs);

    // Sanitize response
    const sanitizedResult = sanitizeData(result);

    preloadLogger.debug(`IPC response: ${channel}`, { result: sanitizedResult });

    return sanitizedResult;
  } catch (error) {
    preloadLogger.error(`IPC invoke failed: ${channel}`, error as Error, { args: sanitizedArgs });
    throw error;
  }
}

/**
 * Safe IPC send wrapper
 */
function safeIpcSend(channel: string, ...args: any[]): void {
  // Validate channel
  if (!validateChannel(channel)) {
    preloadLogger.warn(`Blocked attempt to send to restricted IPC channel: ${channel}`);
    return;
  }

  // Sanitize arguments
  const sanitizedArgs = args.map(sanitizeData);

  preloadLogger.debug(`IPC send: ${channel}`, { args: sanitizedArgs });

  ipcRenderer.send(channel, ...sanitizedArgs);
}

/**
 * Safe IPC event listener wrapper
 */
function safeIpcOn(
  channel: string,
  listener: (event: IpcRendererEvent, ...args: any[]) => void
): () => void {
  // Validate channel (only for custom channels, built-in channels are allowed)
  if (channel !== 'app:event' && !ALLOWED_CHANNELS.has(channel)) {
    preloadLogger.warn(`Blocked attempt to listen to restricted IPC channel: ${channel}`);
    return () => {};
  }

  // Wrap listener to sanitize arguments
  const wrappedListener = (event: IpcRendererEvent, ...args: any[]) => {
    const sanitizedArgs = args.map(sanitizeData);
    listener(event, ...sanitizedArgs);
  };

  ipcRenderer.on(channel, wrappedListener);

  // Return cleanup function
  return () => {
    ipcRenderer.off(channel, wrappedListener);
  };
}

// ==================== EXPOSED API IMPLEMENTATION ====================

const knouxAPI: KnouxAPI = {
  // ========== System Methods ==========
  getPlatform: () => safeIpcInvoke<string>(IPC_CHANNELS.SYSTEM.GET_PLATFORM),

  setAutostart: (enabled: boolean) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.SYSTEM.SET_AUTOSTART,
      enabled
    ),

  restartApp: () => safeIpcInvoke<void>(IPC_CHANNELS.SYSTEM.RESTART_APP),

  quitApp: () => safeIpcInvoke<void>(IPC_CHANNELS.SYSTEM.QUIT_APP),

  // ========== Settings Methods ==========
  getAllSettings: () => safeIpcInvoke<any>(IPC_CHANNELS.SETTINGS.GET_ALL),

  updateSettings: (updates: any) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.SETTINGS.UPDATE,
      updates
    ),

  resetSettings: () =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.SETTINGS.RESET
    ),

  exportSettings: () =>
    safeIpcInvoke<{ success: boolean; data?: string; error?: string }>(
      IPC_CHANNELS.SETTINGS.EXPORT
    ),

  importSettings: (data: string) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.SETTINGS.IMPORT,
      data
    ),

  // ========== Clipboard Methods ==========
  getClipboardHistory: (options?: any) =>
    safeIpcInvoke<any[]>(
      IPC_CHANNELS.CLIPBOARD.GET_HISTORY,
      options
    ),

  addClipboardItem: (item: any) =>
    safeIpcInvoke<{ success: boolean; id?: string; error?: string }>(
      IPC_CHANNELS.CLIPBOARD.ADD_ITEM,
      item
    ),

  deleteClipboardItem: (id: string) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.CLIPBOARD.DELETE_ITEM,
      id
    ),

  updateClipboardItem: (id: string, updates: any) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.CLIPBOARD.UPDATE_ITEM,
      id,
      updates
    ),

  clearClipboardHistory: () =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.CLIPBOARD.CLEAR_HISTORY
    ),

  exportClipboardData: (options?: any) =>
    safeIpcInvoke<{ success: boolean; data?: any; error?: string }>(
      IPC_CHANNELS.CLIPBOARD.EXPORT_DATA,
      options
    ),

  importClipboardData: (data: any) =>
    safeIpcInvoke<{ success: boolean; error?: string }>(
      IPC_CHANNELS.CLIPBOARD.IMPORT_DATA,
      data
    ),

  // ========== AI Methods ==========
  analyzeContent: (content: string, options?: any) =>
    safeIpcInvoke<any>(
      IPC_CHANNELS.AI.ANALYZE_CONTENT,
      content,
      options
    ),

  getSuggestions: (content: string, context?: any) =>
    safeIpcInvoke<any[]>(
      IPC_CHANNELS.AI.GET_SUGGESTIONS,
      content,
      context
    ),

  classifyContent: (content: string) =>
    safeIpcInvoke<any>(
      IPC_CHANNELS.AI.CLASSIFY_CONTENT,
      content
    ),

  enhancePrompt: (prompt: string) =>
    safeIpcInvoke<{ success: boolean; enhanced?: string; error?: string }>(
      IPC_CHANNELS.AI.ENHANCE_PROMPT,
      prompt
    ),

  summarizeText: (text: string, maxLength?: number) =>
    safeIpcInvoke<{ success: boolean; summary?: string; error?: string }>(
      IPC_CHANNELS.AI.SUMMARIZE_TEXT,
      text,
      maxLength
    ),

  // ========== Security Methods ==========
  checkSensitive: (content: string) =>
    safeIpcInvoke<any>(
      IPC_CHANNELS.SECURITY.CHECK_SENSITIVE,
      content
    ),

  encryptData: (data: string, options?: any) =>
    safeIpcInvoke<{ success: boolean; encrypted?: string; error?: string }>(
      IPC_CHANNELS.SECURITY.ENCRYPT_DATA,
      data,
      options
    ),

  decryptData: (encrypted: string, options?: any) =>
    safeIpcInvoke<{ success: boolean; decrypted?: string; error?: string }>(
      IPC_CHANNELS.SECURITY.DECRYPT_DATA,
      encrypted,
      options
    ),

  getPermissions: () =>
    safeIpcInvoke<any>(
      IPC_CHANNELS.SECURITY.GET_PERMISSIONS
    ),

  // ========== Window Management Methods ==========
  minimizeWindow: () => safeIpcInvoke<void>('window:minimize'),

  maximizeWindow: () => safeIpcInvoke<void>('window:maximize'),

  closeWindow: () => safeIpcInvoke<void>('window:close'),

  toggleWindow: () => safeIpcInvoke<void>('window:toggle'),

  // ========== File Dialog Methods ==========
  showOpenDialog: (options: any) =>
    safeIpcInvoke<any>('dialog:showOpenDialog', options),

  showSaveDialog: (options: any) =>
    safeIpcInvoke<any>('dialog:showSaveDialog', options),

  // ========== Event Methods ==========
  onAppEvent: (callback: (event: any) => void) => {
    const unsubscribe = safeIpcOn('app:event', (event, appEvent) => {
      callback(appEvent);
    });

    return unsubscribe;
  },

  sendEvent: (eventType: string, data?: any) =>
    safeIpcInvoke<void>('app:sendEvent', eventType, data),

  // ========== Utility Methods ==========
  openExternal: async (url: string) => {
    // Validate URL for security
    try {
      const parsedUrl = new URL(url);

      // Only allow http/https protocols
      if (!parsedUrl.protocol.startsWith('http')) {
        throw new Error('Invalid protocol');
      }

      safeIpcSend('shell:openExternal', url);
    } catch (error) {
      preloadLogger.warn('Blocked attempt to open invalid URL', { url });
      throw new Error('Invalid URL');
    }
  },

  showItemInFolder: (path: string) => {
    // Basic path validation
    if (typeof path !== 'string' || path.length === 0) {
      throw new Error('Invalid path');
    }

    safeIpcSend('shell:showItemInFolder', path);
  },

  getAppVersion: async () => {
    // Version is exposed via a custom IPC channel
    const { ipcRenderer } = require('electron');
    return ipcRenderer.invoke('app:getVersion');
  },

  getAppPath: async () => {
    const { ipcRenderer } = require('electron');
    return ipcRenderer.invoke('app:getPath', 'exe');
  },

  getUserDataPath: async () => {
    const { ipcRenderer } = require('electron');
    return ipcRenderer.invoke('app:getPath', 'userData');
  },
};

// ==================== CONTEXT BRIDGE SETUP ====================

/**
 * Validate context bridge exposure
 */
function validateContextBridge(): boolean {
  // Check if we're in the right context
  if (typeof contextBridge === 'undefined') {
    preloadLogger.error('contextBridge is not available');
    return false;
  }

  // Check if we're in a preload script
  if (typeof window === 'undefined') {
    preloadLogger.error('window is not available');
    return false;
  }

  return true;
}

/**
 * Setup context bridge with the exposed API
 */
function setupContextBridge(): void {
  if (!validateContextBridge()) {
    preloadLogger.error('Failed to setup context bridge');
    return;
  }

  try {
    // Expose the API to the renderer process
    contextBridge.exposeInMainWorld('knoux', knouxAPI);

    // Also expose a simplified logger for renderer
    contextBridge.exposeInMainWorld('knouxLogger', {
      debug: (message: string, data?: any) =>
        preloadLogger.debug(`[Renderer] ${message}`, data),
      info: (message: string, data?: any) =>
        preloadLogger.info(`[Renderer] ${message}`, data),
      warn: (message: string, data?: any) =>
        preloadLogger.warn(`[Renderer] ${message}`, data),
      error: (message: string, error?: Error, data?: any) =>
        preloadLogger.error(`[Renderer] ${message}`, error, data),
    });

    preloadLogger.info('Context bridge setup completed successfully');

  } catch (error) {
    preloadLogger.error('Failed to expose API via context bridge', error as Error);
  }
}

// ==================== SECURITY CHECKS ====================

/**
 * Perform security checks before exposing API
 */
function performSecurityChecks(): void {
  // Check Node.js integration is disabled (should be false)
  if ((window as any).require) {
    const electron = (window as any).require('electron');
    if (electron && electron.remote) {
      preloadLogger.warn('Electron remote module is available - this is a security risk');
    }
  }

  // Check that we're in a secure context
  if (!window.isSecureContext) {
    preloadLogger.warn('Page is not in a secure context');
  }

  // Check for devtools in production
  if (process.env.NODE_ENV === 'production') {
    // Override console methods in production to limit exposure
    const originalConsole = { ...console };

    Object.keys(console).forEach((key) => {
      if (typeof (console as any)[key] === 'function') {
        (console as any)[key] = (...args: any[]) => {
          // Allow console in development, limit in production
          if (process.env.DEBUG) {
            (originalConsole as any)[key](...args);
          }
        };
      }
    });
  }
}

// ==================== INITIALIZATION ====================

/**
 * Initialize the preload script
 */
function initialize(): void {
  preloadLogger.info('Preload script initializing');

  // Perform security checks
  performSecurityChecks();

  // Setup context bridge
  setupContextBridge();

  // Add global error handler for renderer
  window.addEventListener('error', (event) => {
    preloadLogger.error('Renderer unhandled error', new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    preloadLogger.error('Renderer unhandled promise rejection', new Error(event.reason?.message || 'Unknown rejection'), {
      reason: String(event.reason),
    });
  });

  preloadLogger.info('Preload script initialized successfully');
}

// ==================== EXPORTS ====================

// Initialize on script load
initialize();

// Export types for TypeScript (won't be available in renderer, but useful for development)
export type { KnouxAPI };
export { knouxAPI };

// Note: In a preload script, we don't have a default export
// The API is exposed via contextBridge to the renderer

