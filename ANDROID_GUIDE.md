# Guia de Conversão para App Android (Web TV)

Este documento descreve os caminhos mais limpos, modernos e eficientes para transformar este aplicativo React Web TV em um aplicativo Android (incluindo suporte para Android TV / Smart TV).

Como o seu aplicativo é uma Web TV que depende de reprodução de vídeo via HLS (HLS.js) e de navegação por teclado (D-Pad para controle remoto de TV), existem requisitos especiais de configuração no WebView.

---

## 1. O Caminho Mais Limpo e Recomendado: **Capacitor (by Ionic)**

O **Capacitor** é a solução moderna que substituiu o Cordova. Ele permite empacotar a sua aplicação React existente em um aplicativo nativo Android de forma extremamente limpa. Os arquivos estáticos do React (`build/`) são incorporados diretamente dentro do pacote `.apk`, o que significa que o app carrega instantaneamente sem depender de internet para carregar o layout.

### Vantagens do Capacitor:
*   **Performance:** Os arquivos HTML/JS/CSS rodam localmente no dispositivo.
*   **Transmissão de Vídeo (HLS):** O WebView interno do Capacitor já vem pré-configurado com as melhores práticas para aceleração de hardware, essencial para streaming de vídeo fluído.
*   **Suporte a Teclado/Controle Remoto (D-Pad):** Como o Capacitor renderiza sua página localmente, os eventos de teclado (como as teclas `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Enter`, `Escape` que você configurou no `App.js`) funcionam automaticamente através do controle remoto da Android TV!

### Passo a Passo para Implementar com Capacitor:

1.  **Instale o Capacitor no seu projeto:**
    ```bash
    npm install @capacitor/core @capacitor/cli
    ```

2.  **Inicialize o Capacitor:**
    ```bash
    npx cap init "Bit TV" "com.seudominio.bittv" --web-dir=build
    ```
    *Nota: Certifique-se de preencher `--web-dir=build` porque o Create React App gera a build nessa pasta.*

3.  **Adicione a plataforma Android:**
    ```bash
    npm install @capacitor/android
    npx cap add android
    ```

4.  **Gere a Build do React e sincronize com o Android:**
    Sempre que fizer alterações no código React, você deve rodar:
    ```bash
    npm run build
    npx cap sync
    ```

5.  **Abra o projeto no Android Studio para gerar o APK:**
    ```bash
    npx cap open android
    ```
    No Android Studio, basta ir em **Build > Build Bundle(s) / APK(s) > Build APK(s)** para gerar o seu arquivo instalável.

---

## 2. O Caminho Nativo Puro: **WebView em Kotlin (Android Studio)**

Se você prefere criar um aplicativo nativo do zero no Android Studio e usar uma `WebView` para carregar o seu site hospedado (ex: `https://gabrielfranca95.github.io/web-tv-react/`), você precisa configurar a WebView corretamente para garantir que:
1.  Os vídeos em HLS funcionem perfeitamente (requer aceleração por hardware e permissões de mídia).
2.  O controle remoto da TV (D-Pad) consiga navegar pelos canais (o foco do teclado precisa ser repassado para a WebView).
3.  O vídeo seja reproduzido automaticamente sem exigir que o usuário toque na tela primeiro.

### Configuração recomendada no Kotlin (`MainActivity.kt`):

```kotlin
package com.seudominio.bittv

import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Ativar aceleração de hardware para reprodução fluída de vídeo
        window.setFlags(
            android.view.WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
            android.view.WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED
        )

        webView = WebView(this)
        setContentView(webView)

        configureWebViewSettings()

        // Carrega a URL do seu Web TV
        webView.loadUrl("https://gabrielfranca95.github.io/web-tv-react/")
    }

    private fun configureWebViewSettings() {
        val settings = webView.settings

        // Configurações cruciais para React e Aplicações Web Modernas
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true

        // Permitir que o vídeo inicie automaticamente sem toque físico na tela
        settings.mediaPlaybackRequiresUserGesture = false

        // Ajustes de responsividade
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.allowFileAccess = true

        // Configurar os clientes da WebView
        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()

        // Garantir que a WebView possa receber foco para navegação por teclado/D-Pad (Android TV)
        webView.isFocusable = true
        webView.isFocusableInTouchMode = true
        webView.requestFocus()
    }

    // Repassar os eventos do controle remoto (D-Pad) diretamente para a WebView
    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        if (event.action == KeyEvent.ACTION_DOWN) {
            when (event.keyCode) {
                KeyEvent.KEYCODE_DPAD_UP,
                KeyEvent.KEYCODE_DPAD_DOWN,
                KeyEvent.KEYCODE_DPAD_LEFT,
                KeyEvent.KEYCODE_DPAD_RIGHT,
                KeyEvent.KEYCODE_DPAD_CENTER,
                KeyEvent.KEYCODE_ENTER,
                KeyEvent.KEYCODE_BACK -> {
                    // Repassa a tecla para a WebView interpretar no React
                    webView.dispatchKeyEvent(event)
                    return true
                }
            }
        }
        return super.dispatchKeyEvent(event)
    }
}
```

### No seu `AndroidManifest.xml`:

Certifique-se de adicionar a permissão de internet e habilitar aceleração de hardware:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.seudominio.bittv">

    <uses-permission android:name="android.permission.INTERNET" />
    <!-- Necessário se você quiser rodar em Android TV -->
    <uses-feature android:name="android.software.leanback" android:required="false" />
    <uses-feature android:name="android.hardware.touchscreen" android:required="false" />

    <application
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.AppCompat.NoActionBar">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="landscape"> <!-- Web TV fica melhor travado em Landscape -->
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <!-- Se for para Android TV, adicione a categoria LEANBACK_LAUNCHER -->
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

---

## 3. O Caminho Mais Rápido: **PWA com Trusted Web Activity (TWA) via Bubblewrap**

Se a sua aplicação já está publicada no GitHub Pages e você quer apenas um APK super leve e de alto desempenho que seja distribuível na Google Play Store sem escrever uma linha de código nativo, você pode usar o **Bubblewrap**.

O Bubblewrap usa a tecnologia Trusted Web Activity (TWA) do Google. Ele empacota o seu PWA (Progressive Web App) em um APK nativo de forma automática.

### Requisitos:
1.  O site deve estar publicado sob HTTPS (ex: GitHub Pages).
2.  Deve ter um arquivo `manifest.json` válido e um Service Worker (atendendo aos critérios de PWA).

### Como usar o Bubblewrap:

1.  **Instale a CLI do Bubblewrap globalmente:**
    ```bash
    npm install -g @bubblewrap/cli
    ```

2.  **Inicialize o projeto apontando para a sua URL:**
    ```bash
    bubblewrap init --manifest=https://gabrielfranca95.github.io/web-tv-react/manifest.json
    ```
    *A CLI fará perguntas como o nome do app, ícone, cores, etc., e baixará o JDK e o Android SDK automaticamente.*

3.  **Gere o APK assinado:**
    ```bash
    bubblewrap build
    ```
    Isso gerará os arquivos `.apk` e `.aab` prontos para serem instalados no celular ou enviados para a Google Play.

---

## Resumo: Qual escolher?

| Critério | Capacitor (Recomendado) | WebView Nativo | Bubblewrap (TWA) |
| :--- | :--- | :--- | :--- |
| **Dificuldade** | Baixa | Média | Muito Baixa |
| **Desempenho** | Excelente (Local) | Bom (Depende da rede) | Excelente (Cache PWA) |
| **Funcionamento Offline**| Sim | Não (A menos que configure cache local) | Parcial (via Service Worker) |
| **Navegação D-Pad (TV)** | Perfeito (Nativo) | Requer repasse manual de `KeyEvent` | Bom |
| **Atualização do App** | Requer nova build se mudar o app | Atualiza direto no site hospedado | Atualiza direto no site hospedado |

Para um projeto de **Web TV**, o **Capacitor** é a melhor escolha geral por causa da estabilidade de reprodução de vídeo offline/local e empacotamento completo dos arquivos do React, reduzindo o lag de carregamento inicial.
