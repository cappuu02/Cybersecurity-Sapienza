
# Chapters
1. Hacking Android
	-  Android fundamentals
	- Hacking your Android
	- Hacking other’s Android
2. Hacking iOS
	- How secure is iOS
	- Hacking your iOS
	- Hacking other’s iOS

# 1) Hacking Android

## Introduction and Description

### Android Position
People argue about whether Android is truly open-source, some products and versions are kept secret by Google. Uses Linux kernel, developers can use C and C++, and tools like `nmap` and `tcpdump` can be installed.

>Nowadays, a lot of android user are using an out-of-date OS version.

From 2014 to now, the android malwares are explosive growth. In order to protect us we need to have an antivirus on our android device. (10 million Android malware signatures in Jan. 2014, 8 million Mobile malware signatures in 2023 (Kaspersky))

### Android Fundamentals
![[2Semester/ETH/Images/68.png]]

Il cuore di Android è un **kernel Linux** appositamente compilato per architetture **ARM** (tipiche di smartphone e tablet). Le librerie di sistema contengono funzioni per disegnare grafica 2D/3D, usare il GPS e altro. Utilizzano **SQLite**: motore di database leggero per memorizzare i dati delle app **senza crittografia**. Android usa una macchina virtuale chiamata **Dalvik** per eseguire le applicazioni.

Le librerie Java forniscono funzioni e API per le applicazioni Android e permettono di costruire l’interfaccia, gestire il sistema, accedere a hardware, ecc.

### Dalvik Virtual Machine
Ogni applicazione Android gira in una **istanza separata di Dalvik VM**.  Questo garantisce che le app siano isolate tra loro, aumentando la sicurezza e la stabilità. Dalvik permette alle applicazioni di **funzionare su molti dispositivi diversi**, indipendentemente dall’hardware specifico.

La VM è progettata per funzionare con **risorse limitate**: poca potenza di calcolo, poca memoria e spazio di archiviazione, tipici dei dispositivi mobili. Le app sono scritte in **Java**, ma vengono trasformate in un formato chiamato **DEX (Dalvik Executable)**, ottimizzato per Dalvik.
    
>Dalvik è **open source**, quindi il suo codice è disponibile pubblicamente e può essere modificato o analizzato dalla comunità.

### Sandbox
Ogni applicazione viene eseguita in un processo separato con un ID utente univoco
- Le app non possono interagire tra loro
- La sandbox è implementata nel kernel
- Funziona sia con applicazioni native che con quelle del sistema operativo

>==Sandbox==: meccanismo di sicurezza che crea un ambiente isolato dove un’applicazione può girare senza poter interferire con altre app o con il sistema operativo stesso.

### File System Security
- Da **Android 3.0 in poi**, il file system può essere **criptato con AES a 128 bit**.  
    Questo significa che, se un telefono viene rubato, i dati salvati sul dispositivo sono protetti e non accessibili facilmente.
- La **partizione di sistema** (dove risiede il sistema operativo) è **impostata come sola lettura**, quindi non può essere modificata a meno che l’utente non abbia i privilegi di **root** (cioè i massimi permessi).
- I file creati da un’applicazione non possono essere modificati da un’altra app.  
    Questo è possibile grazie alla **sandbox** che isola le app tra loro.

### Memory Security
- Address Space Layout Randomization (ASLR)
	- È una tecnica di sicurezza che **randomizza (mescola) la posizione in memoria** di programmi, librerie e stack ogni volta che un’app o il sistema si avvia.
• NX bit (No eXecute)
- È una protezione hardware che **impedisce l’esecuzione di codice in certe aree di memoria** designate solo per i dati.

### Protected APIs
User must agree to grant an app permissions.
![[2Semester/ETH/Images/69.png]]

> Tutte le app devono essere firmate con un certificato ma possono essere autofirmate.

### SDK (Software Development Kit)
==Android Emulator==: È un programma che simula un dispositivo Android sul computer. Permette agli sviluppatori di testare le app senza bisogno di un dispositivo fisico.

==Android Debug Bridge==: È uno strumento da riga di comando che consente di **comunicare con l’emulatore o con un dispositivo Android fisico**. Usa porte di rete dal **5555 al 5585** per stabilire la connessione.

Funzioni principali di ADB:
- **pull / push**:
    - _pull_ copia file dal dispositivo al computer.
    - _push_ copia file dal computer al dispositivo.
- **install**:  
    Installa un’app direttamente sul dispositivo.
- **logcat**:  
    Visualizza i log di sistema e delle applicazioni, utili per debug e monitoraggio.
- **forward**:  
    Inoltra una connessione da una porta locale del computer a una porta sul dispositivo.
- **shell**:  
    Permette di aprire una shell remota sul dispositivo, per eseguire comandi direttamente.

>Software più utilizzato ad oggi è Android Studio che pimplementa `Dalvik Debug Monitor Server` con alcune features: Android profiler

![[2Semester/ETH/Images/70.png]]

## Hacking Your Android
###  Rooting Android
Rooting in Android devices mean: tipo di attacco (o modifica volontaria) in cui si **sfrutta una vulnerabilità per ottenere i privilegi di root**, cioè il **controllo completo** del dispositivo.

Rischi principali:
- Brick del telefono: Corrompere il sistema operativo rendendo il dispositivo inutilizzabile
- Perdita Sicurezza: dato che bypassiamo tutte le protezioni di sicurezza di Android
- Molti strumenti di rooting installano **SuperUser.apk**, un’app che gestisce i permessi di root. Anche se può controllare chi ha accesso root, non garantisce una sicurezza completa.

#### Magisk
```ad-abstract
title: Definizione
**Magisk** è uno strumento che permette di fare **root "sistemless"**, cioè **senza modificare direttamente la partizione di sistema**.   Questo lo rende più sicuro e compatibile con aggiornamenti e app che normalmente bloccherebbero dispositivi rooted (es. Google Pay, Netflix, ecc.).

```


### Android Rooting Tools
==SuperOneClick==
È un’applicazione **per PC (Windows)** che può anche funzionare su **Linux e macOS** usando **Mono** (una piattaforma per eseguire programmi .NET su altri sistemi). Come funziona:
    1. Avvia **SuperOneClick** sul PC. 
    2. Collega il telefono via **USB**.
    3. Attiva **"USB Debugging"** dalle Opzioni sviluppatore del telefono.

> Uno dei tool più **universali**, compatibile con molti dispositivi.


==Z4Root==
È un’app che si installa **direttamente sul dispositivo Android**.
Funziona con un semplice clic, ma è **meno compatibile** con dispositivi moderni.
✅ Comoda, ma **vecchia**: funziona bene su Android 2.x.


==GingerBreak==
Tool di rooting specifico per dispositivi con **Android 2.3 (Gingerbread)**.
**Non compatibile** con molti dispositivi più recenti.

==Rooting Kindle Fire==
Il **Kindle Fire OS v1** è basato su Android 2.3, ma **bloccato**: non permette l’uso del Google Play Store. Per ottenere il root:
- Si usava il tool **BurritoRoot**.
- Per versioni più recenti del Kindle Fire, esistono **guide aggiornate** (es. su LifeWire) per il rooting.

### Cool Apps for Rooted Android
==Superuser==
- Controls applications that use root privileges
- Pops up asking for permission each time an app uses the su binary
==ROM Manager==
- Manage custom ROMS, so you can have the latest Android version on your device
==Market Enabler==
- Lets you use apps that are restricted to certain countries, regions, or carriers
==ConnectBot==
- SSH client
==ES File Manager==: copy, paste, cut, create, delete, and rename system files
==SetCPU==
- Overclock or underclock

### Native Apps On Android
Android si basa su **Linux**, quindi è possibile adattare **tool open source Linux** per farli girare su smartphone. Un **cross compiler** permette di scrivere codice su PC (Windows/Linux) e **compilarlo per Android (ARM)**.
    
Il **Native Development Kit (NDK)** di Android consente di sviluppare app in **C/C++**, più potenti e veloci delle app Java. Queste tecniche possono essere usate anche in ambito **ethical hacking**, ad esempio per creare exploit o portare strumenti di sicurezza su Android.

**Precompiled binary tools on Android**
- ==BusyBox==: a set of UNIX tools that allows you to execute useful commands, like tar, dd, wget
- ==Tcpdump==: capture in PCAP file and display packets that are transmitted over a network
- ==Nmap==: discover hardware and software on a network to identify specific details of the host operating system, open ports, DNS names, and MAC addresses,
- ==Ncat==: read and write data across networks from the command line for making various remote network connections

### Trojan Apps
Un'app **Trojan** è un'applicazione apparentemente legittima, ma che contiene **codice malevolo nascosto**.

==Come si crea una Trojan App==
1. **APK = Android Package**
    - È il file che contiene tutti i componenti di un'app Android.
2. **Facile da modificare**:
    - Puoi aprire un APK con strumenti come **7-Zip**, perché è essenzialmente un archivio .zip.
3. **Componenti principali:**
    - `AndroidManifest.xml`  
        → Contiene le **informazioni sull'app** e le **autorizzazioni richieste** (es. accesso a fotocamera, rete, file, ecc.).
    - `classes.dex`  
        → File **Dalvik Executable**: contiene il **codice compilato dell’app** in formato leggibile dalla macchina virtuale Android (Dalvik/ART).

==Come funziona un attacco Trojan==
- Un attaccante **modifica il file `classes.dex`** per aggiungere codice maligno (es. keylogger, backdoor, spyware).
- Ricompatta l’APK e lo firma con una **firma falsa o generica**.
- La vittima installa l’app, pensando sia legittima, ma **il codice maligno si esegue in background.**

Tools for modify an app:
- `apktool`: unzip and repack the android application (apk) file.
- `SignApk`: Verify the repacked file.

### App Entry Points
Le app Android non partono sempre solo quando l’utente le apre. Possono avere **più punti di ingresso** (entry points), cioè **modi in cui il sistema può farle partire automaticamente**.

**1. Broadcast Receiver**
- Riceve **"intents"** (messaggi/interruzioni) dal sistema o da altre app.
- È come un **interrupt software**.
- Permette a un'app di **reagire automaticamente** a certi eventi.

```ad-example
un'app può avviarsi da sola quando:
    - Arriva un **SMS**
    - Il telefono si accende
    - Si cambia la rete Wi-Fi


```

**2. Services**
- Sono **componenti in background**.
- Non hanno interfaccia grafica (**l’utente non li vede**).
- Continuano a girare anche se l’utente cambia app.

```ad-example
    - App di musica in background    
    - App che sincronizza dati
    - Malware che spia senza farsi notare

```


### App Re-packaging
Android trojan app process:
- take a legitimate application, disassemble the dex code, decode the manifest.
- include the **malicious code**, assemble the dex,encode the manifest,
- **sign** the final apk file.
- One tool available is `apktool`

## Hacking Other User’s Androids

> Obiettivi vulnerabili a causa della frammentazione della piattaforma Android

### Remote Shell via WebKit
```ad-abstract
title: Definition
**WebKit** è il **motore open-source** utilizzato da browser Android (e anche da Safari). Serve per **visualizzare pagine web** dentro app e browser.

```

Nelle **vecchie versioni di Android** (fino alla 2.2), WebKit gestiva male alcuni **tipi di dati numerici** (es. floating point). Questo bug poteva essere **sfruttato da un sito web maligno**.

L'attacco funziona in questo modo:
- L'utente visita un **sito compromesso**.
- Il sito serve un **file HTML con codice malevolo**.
- Senza che l’utente se ne accorga, viene scaricato ed eseguito un codice che apre una **remote shell** (cioè, l’attaccante può controllare il dispositivo a distanza).

>**Non dà accesso root**, ma consente comunque **accesso limitato al sistema**.

**Countermeasure**
Aggiornare Android (WebKit è stato corretto da Android 2.2 in poi).
Usare **antivirus** e soluzioni di sicurezza mobile.
Evitare siti sospetti o sconosciuti.


### Data Stealing Vulnerability (Pagina 49)
A malicious website can steal data from the SD card and from the device itself
-  As long as root privileges not required
- User must click a malicious link
- Exploit is a PHP file with embedded JavaScript
- User sees a notification, which may warn them
- Attacker must know name & path to file (WebKit vulnerability can be used)

**Countermeasures**
Use latest version of Android
Install Antivirus
Disable Javascript
Use third party browser like firefox and Opera
Unmount sdcard


### Remote Shell with Zero Permissions
Using carefully chosen functions, it's possible to open a remote shell with no permissions
from the user. Works in all versions of Android, even 4.0, Ice Cream Sandwich

Thomas Cannon https://vimeo.com/33576202
- REBOOT permission: can be bypassed with a DoS attack by generating multiple Toasts
-  INTERNET: can be bypassed by launching an invisible browser. To receive data, custom URI receiver in the manifest (BROWSABLE category)
- Get sensitive data through READ_LOG permission to gather data through other permissions

### Capability Leaks
Stock software exposes permissions to other applications
- Enables untrusted apps to gain privileges the user didn't allow
- Explicit leaks: Access public interfaces or services that have the permission that the untrusted application does not have.
-  Implicit leakes: Untrusted application acquired the same permissions of the privileged application because they share the same signing key

### URL sourced malware
Apps can be also installed from the web browser by downloading .apk files
-  Zeus and Spyeye (Trojan Banking apps)
- Injects a malicious frame in the computer web browser, steals the credentials and displays a web page encouraging the user to click a URL pointing to a Trojan apk file
-  The trojan intercepts all the SMS messages received in the device and shunts them to a remote server
- Bypasses SMS two-factor authentication

**Countermeasure**
URL sourced malware countermeasures
-  Do not allow apks from unknown sources
- Some carriers disable this feature, by default, and it can’t be enabled without root privileges.


### Carrier IQ
Pre-installed on devices
Monitors activity and sends it back to the carrier
Not entirely malicious, intended to improve performance by measuring diagnostic data
Huge privacy controversy (For example, IMIEI and geographical positiojn might be sent to the Carrier)
- Apple was "phasing it out" in 2011
 - It's a form of rootkit

**Countermeasure**
If installed, use removal kit on rooted phone (might be dangerous)

### HTC Logger
realoded manufacturer applications that use logcat to process sensitive information like the content of an SMS or keystrokes
- Vulnearbility in old versions of HTC devices
- htcloggers.apk, collected sensitive data, such as geographical location, user data such as e-mail addresses, phone numbers, SMS data and system logs like logcat
- Opens a local port
-  Any application with INTERNET had access


**COuntermeasure**
- Remove HTC logger with rooted phone
- Patch

### Google Wallet PIN
Currently works on almost every phone, allow to stores encrypted data in a Secure Element (SE). Requires user-defined 4-digit PIN and with five incorrect PIN entries locks the application
-  But PIN is not in the SE
	- Hashed PIN can be broken by brute-force

**Countermeasure**
- Don't root your Wallet phone 
- Also HTC Logger

## Android as a Portable Hacking Platform
Network sniffer (Shark for Root) :
- Cross-compiled tcpdump
- Captures packets in a .pcap file
Network Spoofer (ARP spoofing)
Connect Cat (like netcat)
Nmap for Android

## Defending Your Android
Maintain **physical security**
**Lock** your device (PIN or password)
**Avoid installing apps** from unknown sources
Install **antivirus** software
Enable full internal **storage encryption**
- Available in Android 3.0 and later
Update to latest Android version
- May require custom ROM


# 2) Hacking IOS

## A bit of History

### How secure is iOS?
Originallu iPhone allowed no third-party apps at all but since 2008, the app store appeared. Early versions were very insecure:
- All apps ran as root
- No sandbox
- No code signing
- No ASLR
- No position Independent executable support

Nowadays, the things starting to change, infact:
- Third-party apps run as less priviliged account 'mobile', not root
- Sandboxing limit apps to a limited set of system resources
- Apps have to be signed by apple to execute
- Code signature verification is at load time and runtime
- ASLR for system components and libraries
- PIE causes apps to load at different base address upon every execution

### iPhone 3GS
The iPhone 3GS was the giant leap forward in encryption
-  AES encryption on by default
-  Encryption is very fast
- Key is stored in flash memory, but locked with user's PIN

> Data wipe after 10 guesses is an optional feature


## Jailbreaking
Jailbreaking means taking full control of an iOS device. This operation allows to:
- Customization of the device
- Extensions to Apps
- Remote access via SSH or VCN
- Arbitrary software
- Compiling software on the device

**Risks**
Worries about trojans in jailbreak apps, never yet observed for well-known jailbreak apps
Jailbroken phones lose some functionality
- Vendors can detect jailbreaks and block function
- iBooks did this
Code signature verification is disabled by jailbreaking
-  Expose yourself to a variety of attack vectors

### Boot-based Jailbreak Process
Obtain firmware image (IPSW) for iOS version and device model
- From Apple servers
Obtain jailbreak software
-  redsnow, greenpoison, limera1n
Connect computer to iphone with USB cable
Launch jailbreak app

Select IPSW and wait for customizing
Switch iPhone into Device Firmware Update (DFU) mode
-  Power iPhone off
- Hold Power+Home buttons for 10 sec.
-  Release Power but hold Home down for 5-10 more seconds
Jailbreak software completes the process

### Cydia
The App Store for jailbroken devices

### Remote Jailbreak
Jailbreakme
- Just load a PDF file
- It exploits MobileSafari and jailbreaks the OS
-  Much easier than boot-based jailbreak

## Hacking Other iPhones

### Attack Options
Local network-based attacks
- Wireless MITM requires physical proximity
Attacker with physical access to device
- Boot-based jailbreak
Client-side attacks
- App vulnerabilities, mainly MobileSafari
-  Far more practical
-  But exploiting an app only grants access to data in the app's sandbox
Breaking out of the sandbox
-  Requires a kernel-level vulnerability
Exploits used in Jailbreakme can be re-purposed for attack tools

### Jailbreakme3.0 Vulnerabilities
Uses a PDF bug and a kernel bug
Techniques similar can be used for malicious perposes?

**Countermeasure**: 
- Update iOS to latest version
- If you jailbreak, you can't update iOS
- In order to jailbreak, you must use a vulnerable iOS version

### iKEE Attacks!
People jailbroke iPhones, installed OpenSSH, and left the default password 'alpine' unchanged.

**iKee Worm Countermeasures**
- Don't jailbreak!
- Change the password
- Enable SSH only when needed
	- SBSettings makes this easy
- Upgrade iOS to the latest jailbreakable version
- Install patches made available by the community

### iPhone Remote Attacks
If you don't jailbreak your iPhone, it's very safe. Only one port is open:
- TCP 62087
- No known attacks
- Tiny attack surface
- No SSH, SMB, HTTP
Almost impossible to gain unauthorized access from the network.

### Remote Vulnerabilities
ICMP request causes device reset
SMS message arbitrary code execution exploit

### FOCUS 11 Wireless MITM Attack
Malicious wireless access point simulated with a Mac laptop and two network cards in 2011 Conference in Las Vegas. Certificate chain validation vulnerability exploited to MITM SSL connections. PDF used JailBreakMe3.0 attack to silently root the device. SSH and VNC installed.

**Countermeasures**
Possible to take full acess of iphone so, update ios bundle, configure your iphone to ask to join networks and don't store sensitive data on your phone.

### Malicious Apps
- ==Handy Light==: Contained a hidden tethering feature. Apple removed it once they found out.
- ==InstaStock==: Posed as stock-market tracker, but ran unsigned, unauthorized code

**Countermeasure**
- Apps first submitted to Apple store for review.
- Code may be hidden from the Apple review
- Apple doesn't allow antivirus in the Apple store
- Update firmware
- Apps should be installed only when absolutely necessary and only from trustworthy vendors.

### Vulnerable Apps
Citi Mobile app vuln
- Stored banking data on the iPhone
-  Information disclosure risk if phone stolen
- CVE-201-02913

Paypal Account 
- Allowed MITM attacks
- CVE-2011-4211

Skype XSS
- Embed JavaScript in FullName

**Countermeasure**
Keep your device updated with the latest version of iOS, and keep apps updated to their latest versions.

### Physical Access
Boot-based jailbreak
Install SSH server
Access to data, including passwords in keychain

**Countermeasure**
Encrypt data using Apple features and third- party tools from McAfee, Good, etc.
Use a passcode of 6 digits or more
Install remote-tracking software to recover a stolen or lost device, or remotely wipe it