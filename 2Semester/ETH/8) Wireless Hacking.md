# Wireless Hacking
## Caso Studio: _Read It and WEP_
In questo esempio reale viene mostrata la vulnerabilità delle reti wireless protette con WEP (Wired Equivalent Privacy). Un negozio collegava il suo sistema POS (Point-of-Sale) a una rete Wi-Fi cifrata con WEP. Un attaccante, posizionato nel parcheggio, utilizzava un laptop dotato di una scheda Wi-Fi e un’antenna direzionale. Attivando la **modalità promiscuous**, riusciva a intercettare tutto il traffico wireless nei dintorni.

Per compromettere la rete, l’attaccante usava la suite **aircrack-ng**, composta da vari strumenti:

- `airodump-ng` per sniffare i pacchetti 802.11 e raccogliere gli IV (Initialization Vectors) necessari per attaccare WEP.
- `aireplay-ng` per inviare pacchetti ARP falsificati, forzando il traffico di rete utile a raccogliere un numero sufficiente di IV.
- `aircrack-ng` per decifrare la chiave WEP a partire dal traffico catturato.

Una volta ottenuta la chiave, disattivava la modalità promiscuous, inseriva la chiave nella configurazione di rete e otteneva un indirizzo IP dal DHCP server.

> 🔍 **Definizione – WEP**: Il WEP è stato il primo protocollo di sicurezza per reti Wi-Fi, ma è ormai considerato insicuro poiché i suoi meccanismi di cifratura (basati su RC4) sono vulnerabili a numerosi attacchi.


## Fondamenti delle Reti Wireless IEEE 802.11
Lo standard IEEE 802.11 specifica il funzionamento delle reti wireless. Utilizza bande di frequenza **ISM (Industrial, Scientific and Medical)**, non soggette a licenza.

Le frequenze principali sono due:
- **2.4 GHz**: usata da 802.11b/g/n, include 14 canali, ma solo 3 (1, 6, 11) non si sovrappongono.
- **5 GHz**: usata da 802.11a/n/ac, offre numerosi canali (36–165), tutti non sovrapposti, migliorando le prestazioni e riducendo le interferenze.

# Session Establishment
## Infrastructure vs Ad Hoc
In una rete wireless, i dispositivi possono comunicare in due modalità:

- **Infrastructure Mode**: è la più comune e prevede la presenza di un access point (AP) che funge da punto centrale per la connessione dei client.
- **Ad Hoc Mode**: i dispositivi comunicano direttamente tra loro, in una configurazione peer-to-peer, senza l’uso di un AP. È paragonabile a un cavo crossover Ethernet.

## Processo di Connessione a una Rete Wireless
La connessione a una rete wireless avviene attraverso diverse fasi:
1. **Probe**: Il client invia richieste (probe request) per identificare reti wireless con uno specifico SSID (Service Set Identifier). Le invia su tutti i canali finché non riceve una risposta (probe response).
2. **Autenticazione**: Se la rete usa l’autenticazione aperta, l’access point accetta qualsiasi connessione. In alternativa, con autenticazione a chiave condivisa (shared-key), usata solo con WEP, è richiesta una chiave.
3. **Associazione**: Dopo l’autenticazione, il client invia una richiesta di associazione e riceve una risposta dall’AP.

> ℹ️ **Nota**: Le misure di sicurezza come WPA e WPA2 entrano in gioco **solo dopo** l’autenticazione.


# 🔐 Meccanismi di Sicurezza di Base
Le reti wireless possono adottare misure basilari per migliorare la sicurezza:

- **MAC Filtering**: consente solo ai dispositivi con indirizzi MAC specifici di connettersi alla rete. Tuttavia, è facilmente aggirabile tramite **spoofing**.
- **Reti "nascoste"**: l’SSID non viene incluso nei beacon. In teoria dovrebbe rendere la rete invisibile, ma in realtà i client che conoscono il nome continuano a cercarla, rendendosi vulnerabili a falsi AP (rogue AP).

> ⚠️ Microsoft consiglia di **non nascondere l'SSID**, perché i client con Windows (da Vista in poi) attendono i beacon prima di connettersi, migliorando la sicurezza contro attacchi di spoofing.


## 📡 Broadcast Probe Requests
I client possono inviare richieste di probe **senza specificare un SSID** (broadcast). In risposta, tutti gli access point visibili potrebbero rispondere, ma è buona prassi configurare gli AP per **ignorare** tali richieste e ridurre la visibilità.


## 🔐 WPA, WPA2 e WPA3
Lo standard **802.11i** definisce i meccanismi avanzati di sicurezza. Da questo derivano:

- **WPA**: implementa solo una parte dello standard e utilizza **TKIP** (Temporal Key Integrity Protocol) per cifrare i dati, anche se oggi è considerato obsoleto e vulnerabile.
- **WPA2 e WPA3**: implementano lo standard completo e supportano sia TKIP che **AES** (Advanced Encryption Standard), molto più sicuro.


## 👥 Differenza tra WPA-Personal e WPA-Enterprise
La modalità **WPA-Personal** utilizza una singola password condivisa (pre-shared key) da tutti i client. È semplice da gestire in ambienti domestici, ma poco sicura nei contesti aziendali.

In ambienti professionali, si adotta **WPA-Enterprise**, che impiega un sistema di autenticazione centralizzato tramite **802.1x** e un **server RADIUS**. Gli utenti si autenticano con credenziali personali, senza accedere direttamente alle chiavi di cifratura, migliorando la sicurezza e il controllo.

![[Pasted image 20250520162329.png]]



## 🔁 Four-Way Handshake
Sia WPA-Personal sia WPA-Enterprise si basano su un ==four-way handshake== per stabilire le chiavi di cifratura:

1. L’AP invia al client un numero casuale (**ANonce**).
2. Il client risponde con il proprio (**SNonce**).
3. L’AP calcola una chiave temporanea (**PTK**) e invia un messaggio cifrato.
4. Il client decifra il messaggio, confermando la chiave.

Questo processo genera:
- Una **PTK** per le comunicazioni unicast.
- Una **GTK** per le comunicazioni multicast e broadcast.

## 🔒 Opzioni di Crittografia
Tre sono le principali modalità di cifratura usate nelle reti wireless:
- **WEP**: utilizza l’algoritmo RC4, ma presenta falle critiche che lo rendono facilmente attaccabile.
- **TKIP**: introdotto come sostituto di WEP, funziona anche su hardware vecchio ma usa ancora RC4.
- **AES** (Advanced Encryption Standard): è lo standard più sicuro, usato in WPA2 e WPA3, con modalità **CCMP** e **GCM**.

# Equipment

## Chipset
Il **chipset** è il cuore elettronico della scheda di rete wireless: è il componente che gestisce la comunicazione radio.  
In cybersecurity, non tutte le schede sono adatte: servono **chipset compatibili con funzionalità avanzate** come:

- 🔍 **Monitor Mode** – permette di "ascoltare" tutto il traffico Wi-Fi, anche quello non destinato al dispositivo.
    
- 💉 **Packet Injection** – consente di **inviare pacchetti falsi** (ad esempio per testare la sicurezza o deautenticare client).

Anche se un chipset supporta certe funzionalità, è fondamentale che anche il **driver** (cioè il software che controlla l'hardware) le supporti nel tuo sistema operativo (es. Linux).

### Schede Raccomandate:
- **Ubiquiti SRC** (chipset Atheros)
- **Alfa AWUS050NH** (chipset Ralink RT2770F)

Entrambe supportano 802.11a/b/g/n e permettono l’uso di antenne esterne.

## Windows vs Linux
- Su **Windows** è facile reperire driver per le schede Wi-Fi, ma i tool di attacco wireless sono limitati.
- Su **Linux**, in particolare con **Kali Linux**, i driver sono più complessi da installare, ma i tool disponibili sono molto più potenti e flessibili.

> ⚠️ Le macchine virtuali non consentono l'uso di tutte le funzionalità wireless, a meno di usare una scheda USB. Per operazioni complete, è preferibile usare **Kali su hardware fisico**, via USB boot o LiveCD.


## 📡 Tipi di Antenne
Le antenne influenzano la portata e la direzionalità del segnale:
- **Omnidirezionali**: ricevono e trasmettono in tutte le direzioni.
- **Direzionali**: concentrano il segnale in una sola direzione (es. **Cantenna**, **Yagi**, **Panel**), aumentando la distanza utile per l'attacco.


## 🌍 GPS e War Driving
Il **Global Positioning System (GPS)** consente di registrare la posizione dei dispositivi e, integrato con software di war-driving, permette di creare mappe delle reti Wi-Fi rilevate durante lo spostamento.


## 🔍 Strumenti di Discovery e Monitoraggio
Gli strumenti di scansione Wi-Fi (come `airodump-ng`, `Kismet`, `Wireshark`, ecc.) operano analizzando i **frame di gestione 802.11**, ovvero pacchetti che non trasportano dati utente, ma servono per mantenere e gestire la rete wireless.

### Frame importanti:
- **Beacon**: trasmessi periodicamente dagli Access Point (AP) per annunciare la loro presenza.
- **Probe Request**: inviati dai client alla ricerca di una rete nota.
- **Probe Response**: inviati dagli AP in risposta ai probe request.
- **Authentication/Association**: per iniziare la connessione tra client e AP.

> 📌 **Importante**: Gli indirizzi sorgente e destinazione nei frame 802.11 **non sono cifrati**, permettendo agli strumenti di identificare le relazioni tra i client e gli access point anche in reti protette.


## 📡 Scoperta delle Reti Wireless
Esistono due approcci fondamentali per identificare reti wireless: **scoperta attiva** e **scoperta passiva**.

### Scoperta Attiva (Active discovery)
Questa tecnica consiste nell’invio di **probe request** broadcast da parte del dispositivo. Quando un access point (AP) riceve questa richiesta, risponde con un **probe response** se configurato per farlo. Tuttavia, se l’AP è impostato per ignorare le richieste non specifiche, non verrà rilevato.

>Un esempio di strumento che utilizza questo metodo è **NetStumbler**.

### Scoperta Passiva (Passive discovery)
Molto più efficace, questa tecnica consiste nel **monitoraggio di tutti i canali** disponibili alla ricerca di segnali trasmessi dagli access point. I dispositivi non inviano nulla: si limitano ad **ascoltare** e a registrare i MAC address degli AP rilevati. Questo approccio consente di rilevare anche reti con SSID nascosti.


# Wardriving
## 🚗 Wardriving e Strumenti di Rilevamento
Il ==wardriving== è **l’attività di ricerca di reti wireless effettuata da un veicolo in movimento**. Gli strumenti utilizzati variano, ma includono:
- **Smartphone** (Android + app come WifiScan)
- **Laptop** con software come **Vistumbler**
- Utilizzo di GPS per mappare la posizione delle reti
- **WiGLE**: una piattaforma che raccoglie dati da wardriver in tutto il mondo (oltre 16 milioni di record)


## 🛰️ Sniffing del Traffico Wireless
Sniffare il traffico Wi-Fi è semplice se non viene cifrato. È un’operazione spesso associata ad attacchi **man-in-the-middle (MITM)** e può violare leggi sulla privacy come il **Wiretap Act**.

Per effettuare sniffing a basso livello (frame di gestione 802.11), è necessario che la scheda di rete supporti la **modalità monitor**. Strumenti utili includono:

- **Kismet** (salva i dati sniffati in formato PCAP)
- **airodump-ng** (più semplice da usare)
- **Wireshark** (visualizzazione e analisi del traffico, anche su Mac)


## 💥 Attacco di Deautenticazione
Lo standard 802.11 include meccanismi per la disconnessione dei client, che possono essere sfruttati per **attacchi DoS**.

L’attacco consiste nel **falsificare (spoofing)** frame di deautenticazione inviati dall’AP o dal client. Questo è possibile perché i frame di gestione **non sono autenticati**. Uno strumento molto usato per questo scopo è **aireplay-ng**.

> 🔍 **Nota**: osservare le probe request dei client che si riconnettono dopo una deautenticazione forzata può rivelare l'SSID di reti nascoste.


# Identifying Wireless Network Defenses

## SSID
L’==SSID (Service Set Identifier)== è il **nome della rete**. Può essere recuperato da diversi tipi di frame:

- **Beacon** (inviati periodicamente dall’AP)
- **Probe request/response** (scambio tra client e AP)
- **Association request** (quando un client si connette o si riconnette)

Anche se la **trasmissione SSID è disattivata**, è possibile forzarne la rivelazione inviando un frame di deautenticazione e osservando il tentativo di riconnessione.

## MAC Access Control
Alcune reti usano filtri MAC per permettere l’accesso solo a determinati indirizzi. Tuttavia:

- È un metodo **laborioso da gestire**
- Non garantisce sicurezza reale: l'attaccante può sniffare un MAC legittimo e **spoofarlo**


# Gaining Access (Hacking 802.11)

## Specificare SSID Nascosto
Su Windows, è possibile connettersi a reti con SSID nascosto specificandolo manualmente dalle impostazioni di rete.

## Cambiare MAC Address
Cambiare il proprio indirizzo MAC è utile per bypassare filtri MAC. Può essere fatto via software:

- Strumenti come **SMAC** o **Bwmachak**
- Nativamente tramite **Device Manager** su Windows

## 🔓 Attacchi alla Cifratura WEP
Il WEP (Wired Equivalent Privacy) è facilmente compromettibile. Gli attacchi si basano sul **raccolto di IV (Initialization Vectors)**, che vengono trasmessi in chiaro e possono essere correlati con i primi byte del testo cifrato per dedurre la chiave.

> 🔍 **Definizione – WEP**: Protocollo di sicurezza wireless ormai deprecato. Usa cifratura RC4 con IV pseudocasuali. Vulnerabile a molteplici attacchi passivi e attivi.
>![[Pasted image 20250520163343.png]]

### Strumenti per violare WEP

- **AirSnort**, **WEPAttack**, **DWEPCrack**
- **aircrack-ng** (analisi statistica su pacchetti sniffati)
- **aireplay-ng** (attacco ARP replay)
- **airodump-ng** (sniffing e salvataggio dei frame)

## Attacco Passivo
Si basa sulla raccolta di almeno **60.000 IV** per una chiave a 104 bit. Analisi successiva con `aircrack-ng`.

## Attacco ARP Replay + Autenticazione Falsa
- Si simula una richiesta di autenticazione con MAC spoofato
- Si stimola traffico ARP (broadcast) per generare frame utili
- Entro 5 minuti si raccolgono abbastanza dati per forzare la chiave

> 🛡️ **Contromisura consigliata**: **non usare mai WEP**.



## 🔐 Attacchi a WPA-PSK

Il WPA (Wi-Fi Protected Access) è molto più robusto, ma se la **Pre-Shared Key (PSK)** è debole, è vulnerabile a **attacchi a dizionario**.

### Dettagli tecnici
- PSK da 8 a 63 caratteri, hashed **4096 volte** con l’SSID
- Il processo di autenticazione usa un **four-way handshake**
- È possibile catturare il handshake e tentare l’attacco offline

### Strumenti utilizzati
- **aircrack-ng** (analisi su file PCAP)
- **coWPAtty** (rainbow table specifiche per SSID noti)
- **Pyrit** (attacchi via GPU)

> 🛡️ **Contromisure**:
> - PSK complesse
> - SSID unici (evitare i più comuni)


# Protocollo di Autenticazione (LEAP)

## Cos'è il LEAP?
==LEAP== (Lightweight Extensible Authentication Protocol) è un protocollo proprietario sviluppato da Cisco nel 2000 per **migliorare la sicurezza delle reti wireless, in particolare rispetto alle debolezze del WEP**. Utilizza il **sistema 802.1X e un server RADIUS** per gestire l'autenticazione.

## Debolezze del LEAP

Il problema principale del LEAP è che non protegge contro gli **attacchi dizionario offline**. Si basa su **MS-CHAPv2**, un protocollo di autenticazione di Microsoft che presenta gravi falle di sicurezza.

## Perché MS-CHAPv2 è debole
- Non utilizza **salt** negli hash NT, quindi gli hash sono sempre gli stessi per la stessa password.
- Utilizza una chiave DES di soli 2 byte, molto facile da forzare.
- Invia il nome utente in chiaro durante l'autenticazione.

Queste debolezze permettono attacchi dizionario e brute force molto rapidi, soprattutto usando database di hash già pre-calcolati, come le **rainbow table**.

## Difesa secondo Cisco
Cisco sostiene che LEAP è sicuro **solo** se si usano password molto complesse: almeno 10 caratteri con lettere maiuscole, minuscole, numeri e simboli.

Tuttavia, nella pratica, la maggior parte delle password usate nelle aziende non soddisfa questi requisiti, quindi LEAP può essere violato in pochi giorni o addirittura minuti.

## Strumento: Asleap
Asleap è un tool progettato per:

- Catturare e decifrare le password deboli usate con LEAP.
- Funziona con Air-Jack per disconnettere gli utenti autenticati dalla rete wireless.
- Quando l’utente si ricollega, Asleap intercetta e prova a craccare la password.



# EAP-TTLS e PEAP

## Cosa sono

==EAP-TTLS e PEAP== sono protocolli di autenticazione che creano un **tunnel TLS** sicuro per proteggere protocolli interni più deboli come:

- MS-CHAPv2
- EAP-GTC (password monouso)
- Password in chiaro

## Attacchi possibili
Anche se la crittografia TLS non è attualmente violabile, è possibile eseguire un attacco tramite **falsa access point (AP impersonation)**:

- Si inganna l'utente facendolo connettere a un finto server (attacco MITM).
- Se il client è configurato male e **non verifica il certificato del server**, l'attacco riesce.
- Strumenti come **FreeRADIUS-WPE** accettano qualsiasi connessione e registrano i dati per analisi successive.

## Come proteggersi
È fondamentale che **tutti i client wireless** abbiano abilitata l’opzione:

> "Convalida il certificato del server"

Questo impedisce di accettare connessioni da server RADIUS falsi.
