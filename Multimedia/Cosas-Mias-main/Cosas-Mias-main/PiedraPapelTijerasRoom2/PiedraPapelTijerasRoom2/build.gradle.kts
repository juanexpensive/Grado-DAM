// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false

    // 1. COMENTA O BORRA ESTAS LÍNEAS QUE USAN 'libs':
    // alias(libs.plugins.kotlin.android) apply false
    // alias(libs.plugins.kotlin.compose) apply false

    // 2. AÑADE ESTAS LÍNEAS MANUALES (Kotlin 1.9.22 + KSP compatible):
    id("org.jetbrains.kotlin.android") version "1.9.22" apply false
    id("com.google.devtools.ksp") version "1.9.22-1.0.17" apply false
}