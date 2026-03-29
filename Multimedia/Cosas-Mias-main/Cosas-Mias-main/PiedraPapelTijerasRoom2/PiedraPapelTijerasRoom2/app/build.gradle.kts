plugins {
    alias(libs.plugins.android.application)
    id("org.jetbrains.kotlin.android")
    id("com.google.devtools.ksp")
}

android {
    namespace = "com.example.piedrapapeltijerasroom2"
    compileSdk = 34 // Mantenemos 34 que es estable

    defaultConfig {
        applicationId = "com.example.piedrapapeltijerasroom2"
        minSdk = 26 // Subido a 26 para evitar problemas con librerías modernas
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }

    composeOptions {
        // Usamos la versión de compilador compatible con Kotlin 1.9.22
        kotlinCompilerExtensionVersion = "1.5.8"
    }
}

dependencies {
    // --- VERSIONES ESTABLES MANUALES (Para evitar el error de API 36) ---

    // Core y Ciclo de vida
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")

    // Activity Compose (Versión estable compatible con API 34)
    implementation("androidx.activity:activity-compose:1.8.2")

    // Compose BOM (Bill of Materials) - Controla todas las versiones de Compose UI
    // Usamos la versión 2024.02.01 que es súper estable
    implementation(platform("androidx.compose:compose-bom:2024.02.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")

    // Navegación (Versión estable)
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // --- TESTING ---
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation(platform("androidx.compose:compose-bom:2024.02.01"))
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    // --- ROOM DATABASE ---
    val room_version = "2.6.1"
    implementation("androidx.room:room-runtime:$room_version")
    implementation("androidx.room:room-ktx:$room_version")
    ksp("androidx.room:room-compiler:$room_version")
}