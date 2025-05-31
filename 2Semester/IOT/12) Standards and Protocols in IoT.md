```ad-abstract
title: Definition

A ==protocol== is a **set of rules and procedures** that define how devices
communicate in a network. 

A ==standard== is an framework concordato or a set of guidelines established by a governing body to ensure interoperability between different systems and vendors. 
```

>Protocols and standards can operate on different layers

![[28k.png]]

## Radio spectrum regulation
==Radio spectrum== is regulated by countries and/or organisations, such as the International Telecommunication Union (ITU) and the Federal Communications Commission (FCC).

They **regulate how portions of the spectrum are allocated to different
types of telecommunications** such as radio, television, military, etc.
In IoT  technologies, the frequency bands used by wireless communication are either licensed or unlicensed bands.

### Licensed Bands
==Licensed bands communication infrastructures== Sono implementati da fornitori di servizi e servizi pubblici. Gli utenti devono abbonarsi ai servizi quando collegano i loro dispositivi IoT (canone di abbonamento).

```ad-failure
title: Disadvantage
Ciò aggiunge ulteriore complessità a un'implementazione che coinvolge un gran numero di sensori e altri dispositivi IoT.

```

```ad-success
title: Advantage
The network operator can guarantee the exclusivity of the frequency usage over the target area (lack of congestion, minimal interference).

```

>Licensed bands are used in cellular networks, satellite communication, emergency services, FM/AM radio and TV.

### Unlicensed Bands
The ITU has also defined ==unlicensed spectrum== for the **industrial, scientific, and medical (ISM) portions of the radio bands** (ISM bands).
Mostly used in communication technologies for short-range devices (SRDs). Unlicensed does not mean unregulated. Esistono normative che impongono ai dispositivi parametri quali potenza di trasmissione, ciclo di lavoro, larghezza di banda del canale...

```ad-success
title: Advantage
Simpler deployment than licensed (does not require a service provider).

```

```ad-failure
title: Disadvantage

Can suffer from more interference because other devices may be competing for the same frequency in a specific area.
```

Some protocols within the ISM bands operate in the sub-GHz range (below the Ghz)

```ad-success
title: Advantage
- Sub-GHz frequency bands allow greater distances between devices.
- These bands have a better ability than the 2.4 GHz ISM band to penetrate building infrastructures or go around obstacles.

```

```ad-failure
title: Disadvantage
Lower rate of data delivery compared to higher frequencies.

```

**Didn’t we say that unlicensed bands are for short range communication?** 
Sub-ghz bands allow for longer distances, but sending low power signals that degradate early, allows to create multiple small networks with very little interference.
# Layer 1 and 2 Protocols, IEEE 802.15.4

```ad-abstract
title: Definition

==IEEE 802.15.4== is a **wireless technology for low-cost**, **low-data-rate devices that are battery-powered**, whose batteries may need to last months.
```

- Implementato in reti WSN e MANET e nell'intervallo di rete WPAN.
- **Definisce le specifiche dei livelli PHY e MAC** a bassa velocità di trasmissione dati.
- I livelli PHY e MAC dello standard IEEE 802.15.4 **costituiscono la base per diversi stack di protocolli di rete**.

![[29k.png]]

## ZigBee
Le soluzioni ==ZigBee== sono pensate per **oggetti intelligenti con bassa larghezza di banda e basso consumo energetico**. I prodotti conformi a ZigBee possono interagire anche se prodotti da fornitori diversi.
- **$400$ aziende** sono membri della ZigBee Alliance, un gruppo industriale che certifica l'interoperabilità tra i fornitori.
- Mostly used in **industrial automation** (measuring temperature and humidity, tracking assets) and home applications (lighting thermostats and security control).

### ZigBee stack
![[30k.png]]

- **PHY and MAC layers use IEEE 802.15.4 standard**.
- **Network and security** layer provides mechanisms for **network startup, configuration, routing and securing communication.**
- **Hierarchical addressing**
- Ad hoc On Demand Distance Vector Routing
- **Uses 802.15.4 for security at the MAC layer**

### 802.15.4 PHY 
The original IEEE 802.15.4 standard specified ==three PHY options==:
- 2.4 GHz, up to 16 channels with data rate of 250 Kbps (global)
- 902–928 MHz, 10 channels with data rate of 40 Kbps (North and South America)
- 868.0–868.6 MHz, 1 channel with data rate of 20 Kbps (Europe, Middle East and Africa)

>Latest version (IEEE 802.15.4-2020) uses dozens of different frequency bands, optimised for regions and applications, allowing more flexibility.

The first release was based on **Direct-Sequence Spread Spectrum**. 
L'ultima versione supporta molti schemi di modulazione diversi (QPSK, BPSK, ASK, OOK) e supporta un mix di metodi basati su contesa e senza contesa, a seconda della modalità MAC.

#### 802.15.4 PHY Frame
==Synchronisation Header== (5 bytes):
- **Preamble**: identifies the start of the frame and is used to synchronise data transmission (4 bytes).
- **Start of Frame Delimiter**: informs the receiver that frame contents start immediately after this byte (1 byte).
==PHY Header==: contains the frame length in number of bytes (1 byte).
==PSDU (PHY Service Data Unit)== is the payload (0-127 Bytes).

![[31k.png]]

### 802.15.4 MAC
Il livello **MAC (Medium Access Control)** è quello che **gestisce l'accesso al canale fisico (PHY)**, cioè si occupa di stabilire **come i dispositivi si spartiscono le frequenze radio disponibili**.

Il livello MAC fa queste cose:
- **Invia segnali di presenza (beacon)** per dispositivi che fanno da coordinatori di rete.
- **Gestisce l'associazione/disassociazione** di un dispositivo con la rete PAN (Personal Area Network).
- **Assicura comunicazioni affidabili** tra due dispositivi MAC.

Il livello MAC può usare 4 tipi di frame (messaggi):
- **Data frame**: trasmette i dati veri e propri.
- **Beacon frame**: usato dal coordinatore per inviare beacon.
- **Acknowledgement frame**: conferma che un frame è stato ricevuto correttamente.
- **MAC command frame**: serve per inviare comandi di gestione (es. richiesta di associazione).

>il contenuto del frame MAC è incluso all'interno dei dati trasmessi dal livello fisico.

![[32k.png]]

**Dettaglio: MAC Header (MHR)**

1. **Frame Control (2 Byte)**
	- Tipo di frame (es. dati, comando, beacon, acknowledgment)
	- Modalità di indirizzamento:
	    - Nessun indirizzo
	    - Short address (16 bit)
	    - Extended address (64 bit)
- Altri flag di controllo (es. **security flag**, **acknowledgment request**, **intra-PAN flag**)

2. **Sequence Number (1 Byte)**: Identificatore di sequenza per tracciare i frame e rilevare duplicati.

3. **Addressing Fields (4–20 Byte)**: Comprende:
	- **Destination PAN Identifier** (2B)
	- **Destination Address** (2B o 8B)
	- **Source PAN Identifier** (2B) — può essere omesso se intra-PAN flag è settato.
	- **Source Address** (2B o 8B)


**Dettaglio: MAC Payload**
Contiene i dati specifici del livello MAC o superiori (es. payload applicativo o comando MAC).

**Dettaglio: MAC Footer (MFR)**
- **Frame Check Sequence (FCS)**: Usato per verificare l'integrità del frame (tipicamente CRC a 16 bit)

```ad-important

Lo standard IEEE 802.15.4 richiede che tutti i dispositivi supportino un indirizzo MAC esteso univoco a 64 bit (assegnato dal fornitore).

```

### 802.15.4 Topologies
IEEE 802.15.4 supports networks with:
- ==star==
- ==tree ==
- ==mesh== topologies.

Every 802.15.4 PAN should be set up with a unique ID, shared among nodes in the same network. Two types of devices:
- ==Full Function Devices== - at least one acting as the coordinator, delivering services.
- ==Reduced Function Devices==

![[33k.png]]
### Security
La specifica **IEEE 802.15.4** utilizza l'**Advanced Encryption Standard (AES)** con una **chiave a 128 bit** come **algoritmo di cifratura di base per proteggere i dati**.

Lo standard **802.15.4 verifica l'integrità dei dati inviati tramite un codice di integrità del messaggio (MIC)**, calcolato sull'intero frame utilizzando la **stessa chiave AES**.

L'attivazione di queste funzionalità **modifica il formato del frame**, consumando una parte maggiore del payload disponibile.

![[34k.png]]

#### Advanced Encryption Standard (AES)
```ad-abstract
title: Definition
Algoritmo di **cifratura simmetrica (stessa chiave per cifrare e decifrare) a blocchi (lavora su blocchi di 128 bit, ovvero 16 byte)**

```


- I 128 bit del messaggio vengono organizzati in una **matrice 4x4** chiamata **state matrix**, dove **ogni casella contiene 1 byte**.
- ==Key Expansion==: AES usa una **chiave di 128 bit** per generare **11 chiavi di round** (una per ciascuno dei 10 round, più una iniziale). 
- ==AddRoundKey==: Prima di iniziare i round veri e propri, **si fa uno XOR tra la state matrix e la prima round key** (chiave iniziale). Poi partono i **10 round** di trasformazioni.

![[35k.png]]

**Fase iniziale (AddRoundKey)**
- Si esegue **uno XOR tra la State Matrix e la prima chiave di round**.
- Questa fase avviene **prima dei round veri e propri**.

Ogni round (da 1 a 9) ha **4 fasi**:
1. **Substitute Bytes (SubBytes)**
    - Ogni byte della matrice viene sostituito usando una **S-box** (tabella di sostituzione non lineare).
2. **Shift Rows**
    - Le righe della matrice vengono **ruotate** a sinistra di un numero crescente di posizioni:
        - 1ª riga: nessun shift
        - 2ª riga: shift di 1
        - 3ª riga: shift di 2
        - 4ª riga: shift di 3
3. **Mix Columns**
    - Ogni colonna viene **moltiplicata** per una matrice fissa in aritmetica Galois (GF(2^8)), per **mescolare** i dati.
4. **AddRoundKey**
    - Ogni byte della state matrix viene **XORato** con la chiave del round corrente.

**Ultimo Round**: Come i precedenti, **ma senza Mix Columns**.
# Layer 1 and 2 Protocols, IEEE 802.11ah
==IEEE 802.11 is the WiFi standard==, the most successful wireless technology for unconstrained networks (rete senza vincoli).  It is a key wireless access technology:
-  Can connect endpoints such as computing nodes, high data rate sensors, audio/video analytics devices
-  WiFi backhaul infrastructures include also WiFi mesh in smart cities.

## IEEE 802.11 Version
![[36k.png]]

## 802.11ah (WiFi HaLow)
**Traditional WiFi**
progettato per fornire un'elevata capacità di trasmissione per reti di piccole dimensioni con poche decine di nodi e una copertura di decine di metri.

**IEEE 802.11ah (2017)**
==Is the first Wi-Fi solution optimised for IoT applications==. It supports sub-GHz frequency bands for better signal penetration (up to 1km transmission range), low power for battery-powered nodes, and the ability to support a large number of devices.

### 802.11ah PHY 
**Operates in unlicensed sub-GHz bands**, varying from Country to Country.
Uses ==Orthogonal Frequency Division Multiplexing (OFDM) modulation==.
-  OFDM is a frequency-division multiplexing (FDM) scheme.
- In FDM, signals are non overlapping.
- Nell'OFDM i segnali si sovrappongono, ma il picco di un segnale si trova sullo zero degli altri segnali (ortogonalità).
-  Improved bandwidth usage

![[37k.png|400]]

Uses channels of 1, 2, 4, 8, or 16 MHz band-width and different frequency bands depending
on the country. Supports spatial multiplexing (MIMO) to create multiple streams (rarely used in practice).

![[38k.png]]

## 802.11ah MAC 
The ==IEEE 802.11ah MAC== layer is **optimized to support new sub-GHz Wi-Fi PHY while providing low power consuption and the ability to support a larger number of endpoints**.

Here, we have a reduced Header in MAC frame.

![[39k.png]]

==Tecniche ed ottimizzazioni== pensate per migliorare **l'efficienza energetica**, la **scalabilità** e la **gestione del canale in reti wireless a bassa potenza ed alta densità di dispositivi**.

==Null Data Packet (NDP) Support==:
- È possibile **inviare frame senza payload**, cioè senza dati veri e propri.
- Le **informazioni importanti sono contenute solo nell’intestazione PHY**, così si **evita l’elaborazione inutile** dell’intestazione MAC e del contenuto dati.
- Questo rende i **frame di controllo più leggeri**, veloci da gestire e **meno dispendiosi in termini di energia** per i dispositivi riceventi.

==Short Beacons:==
- Questi **beacon corti vengono inviati più spesso**, ma solo **quando non ci sono cambiamenti nella rete**.
- Servono per **mantenere la sincronizzazione** dei dispositivi e verificare che siano ancora attivi (keep alive).
- I **beacon completi** invece vengono inviati meno frequentemente.

==Restricted Access Window (RAW) Mechanism:==
Un **Access Point (AP)** invia **beacon per annunciare la presenza della rete Wi-Fi**e sincronizzare le comunicazioni con i dispositivi. Può gestire fino a 8192 dispositivi, ma in ambienti molto affollati aumentano le **probabilità di collisione**. 

Per evitare questo problema, il **tempo viene suddiviso in finestre chiamate RAW** (Restricted Access Window), **ulteriormente spezzate in slot temporali in cui solo gruppi specifici di dispositivi possono trasmettere**. Questo meccanismo unisce TDMA e CSMA/CA per migliorare l'accesso al canale. 

Lo standard IEEE 802.11ah ottimizza ulteriormente l’efficienza in reti dense usando una suddivisione gerarchica dei dispositivi in base al loro comportamento, alla posizione, ai requisiti di qualità del servizio (QoS) e all’efficienza energetica.

![[40k.png]]

==Target Wake Time (TWT)==
- Serve per **ridurre il consumo energetico**.
- L'AP dice ai dispositivi **quando potranno comunicare**, così nel frattempo possono **restare in modalità a basso consumo**.
- Questo sistema **riduce il rischio di collisioni**, specialmente dove ci sono molti dispositivi.
- È **utile per dispositivi che inviano dati solo ogni tanto**.

==Group sectorization:==
Consiste nel suddividere diverse aree in settori (divisione spaziale), ciascuno contenente un sottoinsieme di stazioni, con l'obiettivo di mitigare problemi di nodi nascosti, contesa o interferenza. È particolarmente efficace quando l'AP dispone di più antenne direzionali.

==Hierarchical Organization:==
- Quando un dispositivo si connette a un AP, gli viene assegnato un **AID (Association ID)**, un identificatore a **13 bit** (quindi 8192 valori possibili).
- Gli AID sono **organizzati in modo gerarchico**:
    - In **P pagine**, ognuna con **B blocchi**,
    - Ogni blocco ha **8 sottoblocchi**, ognuno con **8 dispositivi**.
- I dispositivi **con caratteristiche simili vengono messi insieme**, così si riducono i costi (di tempo e risorse) quando il sistema deve riferirsi a loro.

# Layer 1 and 2 Protocols, LoRaWAN

## LPWA
In recent years, a new set of wireless technologies known as ==Low-Power Wide-Area (LPWA)== has received a lot of attention from the industry. **Particularly well adapted for long-range and battery-powered endpoints**. LoRaWAN (Long-Range Wide-Area Network) is an **unlicensed band LPWA technology**. 

>NB-IoT (Narrow-Band IoT) and LTE are LPWA-based licensed band protocols using cellular networks.

## LoRaWAN standardisation
LoRa è stata inizialmente sviluppata come tecnologia di modulazione del livello fisico (PHY) da Cycleo, un'azienda francese. Progettata per comunicazioni bidirezionali a lungo raggio con basso consumo energetico, la tecnologia si è espansa oltre il livello 1.

LoRa di Semtech, che rimane la modulazione PHY fondamentale di Livello 1, è ora disponibile tramite diversi fornitori di chipset. Il termine "LoRaWAN" si riferisce all'architettura completa e alle specifiche, che comprendono i protocolli di comunicazione end-to-end che iniziano il funzionamento delle reti LoRaWAN..

![[41k.png]]

## LoRa PHY
==LoRa PHY operates across various unlicensed frequency bands, which vary by region. ==

La rete **LoRa** (Long Range) utilizza una **topologia a stella**.
Al **centro** di questa stella c’è un dispositivo chiamato **gateway LoRa**, che funge da **hub centrale**.
**Tutti gli endpoint** (cioè i sensori, attuatori, dispositivi IoT) **comunicano direttamente con il gateway**, in **un solo salto**.
Nessun dispositivo inoltra il messaggio di un altro: **tutto passa solo per il gateway**.

I **gateway LoRa** sono dispositivi potenti, dotati di **più ricevitori radio (transceiver)**. Grazie a questo, riescono a:
- **Ricevere più segnali contemporaneamente**, anche su **canali diversi**.
- **Demodulare segnali separati anche se arrivano sullo stesso canale**, sfruttando differenze come **spreading factor**.
Il loro **ruolo principale** è quello di **inoltrare dati** dagli endpoint verso un **server centrale (di rete o applicativo)** e viceversa.


Per implementazioni su larga scala, è possibile implementare una topologia a **stella di stelle"**, in cui **più gateway LoRa si interconnettono per estendere la copertura e migliorare la capacità della rete**.

![[42k.png|300]]

The ==data rate in LoRaWAN== is **not fixed but varies based on regional frequency bands** and **Adaptive Data Rate (ADR)**. 

The ==ADR algorithm== **dynamically adjusts the data rate and transmission power for each endpoint to optimize network performance**, ensuring efficient and scalable communication.

Endpoints located near gateways, where signal strength is strong, transmit at **higher data rates**. This results in **shorter transmission times** and **lower power consumption**. Conversely, devices at the edge of coverage—where the signal is weak—operate at the **lowest data rate** and **highest transmit power** to maintain reliable connectivity.

**ADR maximizes both energy efficiency and network capacity, adapting in real time to changing conditions**.

### LoRa PHY - CSS
**LoRa** utilizza una tecnica di ==modulazione== chiamata ==Chirp Spread Spectrum (CSS)==.  
In questa modulazione, i dati vengono codificati usando **chirp**, cioè segnali la cui **frequenza aumenta (up-chirp)** o **diminuisce (down-chirp)** in modo lineare nel tempo. Ogni chirp rappresenta **un simbolo**.

È possibile **codificare l'informazione nei chirp** variando:
- il **ritardo (offset)** all'interno di un intervallo di tempo,
- la **fase** del segnale
- o la **direzione** del chirp (verso l'alto o verso il basso).

Ogni simbolo sfrutta **l'intera larghezza di banda disponibile**, rendendo la trasmissione robusta alle interferenze.

![[43k.png]]

==SF = Spreading Factor== controlla **quanto tempo dura un chirp** e **quanti simboli diversi puoi rappresentare**. Abbiamo $6$ possibili valori di spreading factor ($SF$): ds $SF7$ a $SF12$

| SF   | Simboli possibili | Durata simbolo | Data rate |
| ---- | ----------------- | -------------- | --------- |
| SF7  | 2⁷ = 128          | Breve          | Alto      |
| SF12 | 2¹² = 4096        | Lunga          | Basso     |

In modulazioni classiche (come ASK, PSK, FSK), tutti i simboli hanno **stessa durata**.  
In CSS, **la durata del simbolo aumenta esponenzialmente con lo SF**, cioè più alto è lo SF, più tempo serve per trasmettere un simbolo.

Questo succede perché, per distinguere più simboli (cioè più frequenze diverse), il chirp deve **esplorare le frequenze in modo più fine e preciso**, e quindi ci vuole **più tempo di osservazione**.

![[44k.png]]

L'**ADR** è un meccanismo intelligente di LoRaWAN che **ottimizza automaticamente lo SF** per ogni dispositivo.

🔽 **Se sei vicino al gateway**: Usi **SF basso** → trasmetti **velocemente**, meno consumo.
 🔼 **Se sei lontano**: Usi **SF alto** → maggiore **affidabilità**, ma **più lento**.

Per ottenere **prestazioni ottimali**, l’ADR dovrebbe essere attivo per i **dispositivi fissi** (quelli che non si spostano), così da **ottimizzare automaticamente** i parametri di trasmissione.  

Per i **dispositivi mobili**, invece, è meglio **usare un SF fisso**, poiché i cambiamenti continui di segnale potrebbero causare frequenti ricalcoli e instabilità nella comunicazione.

## LoRaWAN MAC
I **messaggi LoRaWAN** hanno un **payload fisico (PHY payload)** composto da tre parti:
1. **MAC header** di 1 byte,
2. **MAC payload** di lunghezza variabile (dipende dalla banda di frequenza e dal data rate),
3. **MIC (Message Integrity Code)** di 4 byte, che serve a **verificare l’integrità** del messaggio.

Ogni dispositivo LoRaWAN è **univocamente identificabile** tramite diversi tipi di indirizzi:
- **DevEUI**: un identificatore globale unico del dispositivo finale.
- **AppEUI**: un identificatore globale unico dell’applicazione o del proprietario del dispositivo.
- **DevAddr**: un indirizzo di 32 bit usato all’interno della rete LoRaWAN.
    - I **7 bit più significativi** sono il **NwkID**, che identifica la rete.
    - I **25 bit meno significativi** sono il **NwkAddr**, che identifica il dispositivo all’interno di quella rete.


## LoRaWAN topology
The infrastructure consists of endpoints exchanging packets through gateways acting as bridges, with a central LoRaWAN network server. 

Gateways connect to the backend network using standard IP connections, and endpoints communicate directly with one or more gateways.

![[45k.png]]

## LoRaWAN security 
==LoRaWAN== adotta ==due livelli di sicurezza essenziali per garantire una protezione robusta==: 

1. ==il livello di rete== **autentica** i dispositivi e **cripta i messaggi di controllo a livello MAC usando AES con una chiave condivisa chiamata NwkSKey**, assicurando l’integrità tramite controlli crittografici; 
2. ==il livello applicativo== **cripta** separatamente i dati utente end-to-end **con una chiave AppSKey generata dinamicamente**. 

Entrambe le chiavi derivano da una chiave radice unica,**l’AppKey**, valida per ogni sessione, evitando il riutilizzo e garantendo la segretezza in avanti. Questa architettura applica il principio di difesa in profondità, isolando le funzioni di rete dai contenuti dell’utente per una sicurezza multilivello.

![[46k.png|400]]

## AES Counter mode (AES-CTR)
- ==LoRaWAN usa AES-CTR== per garantire l’integrità dei messaggi.
- AES-CMAC genera un codice chiamato **MIC (Message Integrity Code)**, che verifica che il messaggio non sia stato modificato e provenga da una fonte affidabile.
- Per calcolare il MIC:
    - Si parte dalla chiave di rete (**NwkSKey**), da cui si ricavano due sottochiavi, **K1** e **K2**.
    - Il messaggio (intestazione + dati) viene diviso in blocchi da 128 bit; se l’ultimo blocco è incompleto, si aggiunge padding.
    - Si usa una variabile interna **Xi**, inizialmente zero.
    - Per ogni blocco si calcola:  
        `Xi = AES_Encrypt(K, Xi-1 XOR blocco)`
    - L’ultimo blocco viene elaborato con K1 o K2 a seconda che sia completo o meno.
- Il risultato è un codice CMAC di 128 bit, ma si usano solo i primi 4 byte come **MIC**.
- Se anche un solo bit del messaggio cambia, il MIC non corrisponde più, segnalando un’alterazione.

![[47k.png]]

- Per cifrare i dati, LoRaWAN usa **AES-CTR**, che funziona così:
    - Non si cifra direttamente il messaggio.
    - Si genera una **keystream** da 128 bit cifrando un **contatore** con AES.
    - La keystream viene combinata col messaggio tramite un’operazione **XOR** per ottenere il testo cifrato.
- Questa tecnica è sicura perché:
    - Lo stesso contatore non viene mai riutilizzato con la stessa chiave.
    - L’operazione XOR è veloce ed efficiente.

# Layer 1 and 2 Protocols, Bluetooth Low Energy

## BLE architecture and stack
The functionality of the Bluetooth LE protocol stack is divided between ==three main layers==:
- Controller
- Host
- Application

![[48k.png]]

BLE transmits in the 2.4 GHz radio spectrum.
The **frequency band is divided into 40 channels**, three of which are used for advertising, while the others are for **data transmission**. The link layer describes how
different devices share the channel to communicate. Its operation can be described as a state machine with 5 possible states.

![[49k.png]]

The ==host controller interface== (HCI) layer is a standard protocol that **transports commands and events between the host and controller elements**. L2CAP offers segmentation and
reassembly services for large packets.

The **attribute protocol** (==ATT==) defines how data is represented in a BLE server database and the methods by which that data can be read or written

The ==GATT== layer is used by the application for **data communication between two connected devices**

The ==GAP== determines **how two Bluetooth units discover and establish a connection with each other**.

## Roles in BLE
There are many different roles that BLE devices can have, depending on how they interact during communication. Different types of roles exist at different layers (can be a little confusing).

### BLE Link Layer
The ==Link Layer State Machine== in Bluetooth Low Energy (BLE) regola le modalità operative per la comunicazione dei dispositivi.

- **Standby State**: Il dispositivo rimane inattivo, senza trasmettere né ricevere pacchetti.
- **Advertising State**: The device broadcasts packets on dedicated advertising channels (37, 38, 39) and listens for responses, acting as an **advertiser**.
- **Scanning State**: The device passively listens for advertising packets without initiating connections, functioning as a **scanner**.
- **Initiating State**: The device actively scans for advertisements from specific targets and responds to establish a connection, acting as an **initiator**.

These states enable flexible, low-power interactions for various BLE applications.

**Connected State**
Once a connection is established, the devices transition to the **Connected State**. Within this state, two roles are defined:

- **Central Role**: Assigned to the device that initiated the connection (previously in the **Initiating State**).
- **Peripheral Role**: Assigned to the device that accepted the connection (previously in the **Advertising State**).

In the connected state, the **central device** manages communication timing using **Time-Division Multiple Access (TDMA)**, coordinating transmissions with the **peripheral device**.

![[50k.png]]

Le applicazioni in esecuzione sul dispositivo BLE sono responsabili della definizione del suo ruolo, in base alle loro esigenze funzionali, ai vincoli di potenza o all'intento di comunicazione. Il protocollo responsabile della definizione e del controllo di questi ruoli è: ==GAP==. 

==Generic Access Profile (GAP)== controlla le connessioni e la pubblicità in BLE. 
Definisce modalità e ruoli di comunicazione. BLE supporta due diverse modalità di comunicazione:
- Comunicazione orientata alla connessione
- Comunicazione broadcast

## GAP - communication modes
- ==Connection oriented communication==: when there is a dedicated connection (link) between devices, forming a bi-directional communication (central and peripheral roles).
- ==Broadcast communication==: when devices communicate without establishing a connection and by broadcasting data packets to all devices within its range. Unidirectional communication. Example:

![[51k.png]]

## Broadcast topology in BLE
Un dispositivo chiamato **broadcaster** invia pacchetti di dati visibili a tutti i dispositivi nelle vicinanze chiamati **observer**. Non c’è limite al numero di dispositivi che possono ricevere i dati. È un metodo molto efficiente dal punto di vista energetico, ma con bassa velocità di trasmissione e senza conferma di ricezione (ACK).

![[52k.png|300]]

## Connection-oriented topology
![[53k.png]]
Establishes a bidirectional connection before data transfer occurs.
Increased throughput by establishing a direct link before communication.

## Mesh (multi-role) Topology
==A device can operate in multiple different roles simultaneously==, i.e., Può fungere da periferica in un contesto e da centrale in un altro. Viene spesso utilizzato in sistemi in cui un dispositivo funge da hub e riceve dati da più sensori e allo stesso tempo desidera inoltrarli ad altri dispositivi.

![[54k.png]]

## ATT & GATT: Data representation and exchange
The just seen GAP layer defines communication modes (connection- oriented/broadcast oriented) and roles (peripheral and central/broadcaster and observer) and is responsible for the advertising phase.

In connection-oriented communication mode, after the bi-directional communication is established, the ==Attribute protocol (ATT)== and the ==Generic Attribute Profile (GATT)== layers **define how data is represented and exchanged between BLE devices**.

si occupano della fase successiva allo stabilimento della connessione, a differenza del livello ==GAP che si occupa del processo di pubblicità che si verifica prima che la connessione venga stabilita==.

### ATT Protocol 
The ==ATT protocol== is used to **discover, read and write attributes on a peer device**.
Based on a **client-server architecture** where the server holds the data and
can either send it directly to the client or the client can poll the data from the server.

The client and server roles defined in this layer are assigned independently
from the peripheral and central roles defined in the GAP layer. Nevertheless, usually a peripheral is the server since it is the one acquiring data and holding it, and the central is usually the client. These roles are decided by the GATT layer.

Most of the times, the mobile phone (central) acts as client, reading data advertised by the sensor (peripheral - server). Sometimes, the mobile phone acts as a server and the sensor as a client, as in the picture, which requests a firmware update to the mobile.

![[55k.png]]

#### ATT Protocol - Attributes
Gli attributi sono composti da quattro campi:
- **Tipo**, definito da un identificatore univoco universale (UUID), valore a 128 bit.
- **Handle**, identificatore univoco senza segno a 16 bit utilizzato dal client per fare riferimento a un attributo sul server. Rende l'attributo "indirizzabile" e non cambia durante una singola connessione.
- **Permessi**, definisce il livello di controllo di accesso per una risorsa (lettura/scrittura/notifica).
- **Valore**, i dati dell'attributo.

#### ATT Protocol - operations
Il ==protocollo ATT definisce sei metodi== per leggere o scrivere gli attributi. Definiscono diverse unità dati di protocollo (PDU), ovvero diversi pacchetti da incapsulare e inviare sul collegamento fisico.

##### 🔹 **Request (Richiesta)**
Messaggio inviato dal **client** al **server** per richiedere un'operazione, ad esempio leggere un valore.
> 💬 Esempio: "Server, qual è il valore della temperatura?"
##### 🔹 **Response (Risposta)**
Messaggio inviato dal **server** al **client** come risposta a una richiesta (Request).
> 💬 Esempio: "La temperatura è 22°C."

##### 🔹 **Command (Comando)**
Messaggio inviato dal **client** al **server** per eseguire un’azione. **Non richiede risposta**.
> 💬 Esempio: "Imposta la velocità della ventola su 3." (il client non aspetta conferma)

##### 🔹 **Indication (Indicazione)**
Messaggio inviato dal **server** al **client** senza che venga richiesto. Serve per inviare **dati critici in modo affidabile**, cioè richiedendo conferma.

> 💬 Esempio: "Attenzione: la temperatura ha superato i 70°C."  
> → Il client **deve confermare** di averlo ricevuto.

##### 🔹 **Confirmation (Conferma)**
Messaggio inviato dal **client** al **server** per confermare di aver ricevuto un'**Indication**.
> 💬 Esempio: "Messaggio ricevuto correttamente."


##### 🔹 **Notification (Notifica)**
Messaggio inviato dal **server** al **client** **senza richiesta e senza conferma**. Usato per aggiornamenti **rapidi e frequenti**, quando non è necessario garantire la ricezione.

> 💬 Esempio: "Il battito cardiaco attuale è 78 bpm."  
> → Non serve risposta dal client.

## GATT Layer
Il ==GATT Layer== è uno strato del protocollo BLE che si appoggia all’**ATT Layer** (Attribute Protocol) e definisce **come** i dati vengono organizzati e scambiati tra dispositivi Bluetooth Low Energy. Componenti:
### 🧩 **Profiles (Profili)**
- Un **profilo** è un insieme predefinito di **servizi** che descrive un caso d’uso specifico.
- I profili garantiscono che dispositivi di marche diverse possano comunicare correttamente se seguono lo stesso profilo.
- **Esempi:** profilo cardiofrequenzimetro, tastiera BLE, termometro.

> Un profilo dice "cosa" serve per un certo tipo di dispositivo.

#### 🧱 **Services (Servizi)**
- Ogni **servizio** rappresenta un gruppo logico di dati.
- Contiene una o più **characteristics** (caratteristiche).
- È identificato da un **UUID (Universal Unique Identifier)**, che può essere standard o personalizzato.

> Un servizio organizza le caratteristiche relative a una funzionalità (es. misurazione della frequenza cardiaca).


#### 🔢 **Characteristics (Caratteristiche)**
- Una **caratteristica** rappresenta un singolo **dato** (es. valore della temperatura, frequenza cardiaca).
- Ogni caratteristica può avere diverse **proprietà**, come:
    - `read` (lettura),
    - `write` (scrittura),
    - `notify` (notifiche automatiche),
    - `indicate` (notifiche affidabili).

> È l'elemento base con cui il client interagisce per leggere o scrivere dati.

```ad-example
![[56k.png]]

```

![[57k.png]]

# Layer 3 Protocols

## Advantages of IP in IoT
Il protocollo Internet (IP) esiste da oltre 35 anni!
1. ==Unico (Ubiquitous)== - Tutti i sistemi operativi moderni, dai computer normali ai sistemi embedded leggeri (come TinyOS), hanno uno stack IP integrato che supporta sia IPv4 che IPv6 e che viene costantemente migliorato.
2. ==Gestibile e altamente sicuro== Esistono protocolli, meccanismi e strumenti per la gestione della rete e la sicurezza che sono ampiamente disponibili e consolidati.
3. ==Scalabile== - Internet ospita milioni di infrastrutture IP private e pubbliche in tutto il mondo, dimostrando la sua capacità di crescere.
4. ==Stabile== - È stato utilizzato per anni in infrastrutture critiche come reti finanziarie e di difesa. Supporta servizi critici e applicazioni sensibili ai ritardi (come videochiamate e gaming online).

>È universale, sicuro, può gestire grandi volumi e ha dimostrato la sua affidabilità nel tempo.

## Disadvantages of IP in IoT
![[59k.png]]

Le comunicazioni last-mile nell'IoT hanno problemi con il protocollo IP perché molti dispositivi inviano solo pochi bytes di dati sporadicamente, ma gli header IP (20-40 bytes) creano un overhead enorme rispetto ai dati effettivi, rendendo la comunicazione inefficiente.

>Last-mile: parte finale della rete che collega l’infrastruttura centrale ai **dispositivi IoT** sul campo.


## IoT Devices
L'IoT include due tipologie principali di dispositivi: 
- **Dispositivi altamente vincolati:**
    - Hanno **risorse molto limitate** (CPU, memoria, energia).
    - Trasmettono solo **piccole quantità di dati** e in modo **sporadico**.
    - La **sicurezza è minima** o semplificata per risparmiare risorse.
    - Esempi: sensori ambientali, dispositivi indossabili semplici.
- **Dispositivi simili a PC ma con vincoli di rete:**
    - Hanno una **buona potenza di calcolo**, come piccoli computer.
    - Possono eseguire un **protocollo IP completo**.
    - Hanno però **vincoli sulla rete**, come **bassa larghezza di banda** o **connessioni instabili**.
    - Esempi: gateway IoT, dispositivi industriali connessi.

## Optimising IP for IoT
I dati IoT viaggiano attraverso Internet per:
- **Monitoraggio e controllo remoto** (ad esempio, i dati vengono inviati a telefoni cellulari tramite comunicazione cellulare).
- **Analisi e archiviazione nel cloud**.
- **Integrazione con servizi esterni**.
- **Aggiornamenti/configurazione del firmware**.

Il ==protocollo Internet== è **fondamentale per il successo dell'Internet of Things**, ma nodi e reti vincolati richiedono l'ottimizzazione a vari livelli e su più protocolli dell'architettura IP. L'ottimizzazione può essere ottenuta aggiungendo un livello di adattamento nello stack TCP/IP.


![[60k.png]]

## Layer 3 Protocols, 6LoWPAN
==6LoWPAN== (IPv6 over ==Low-Power Wireless Personal Area Networks==) is an **open standard** defined in RFC 6282 by the Internet Engineering Task Force (IETF), originally conceived to support IEEE 802.15.4 low-power wireless networks in the 2.4-GHz band. I**t is now being adapted and used over a variety of other networking media including Sub-GHz low-power RF**. It **allows transmission of IP packets in low-power wireless networks** . **Works at the adaptation layer.**

![[61k.png]]

L'ottimizzazione e l'adattamento eseguiti con 6LoWPAN sono ottenute grazie alla **compressione dell'intestazione, alla frammentazione e all'indirizzamento mesh**. Tali operazioni creano intestazioni separate, impilate nel livello di adattamento. A seconda dell'implementazione, è possibile abilitare tutte, nessuna o una qualsiasi combinazione di queste funzionalità e delle relative intestazioni.
==6LoWPAN funziona solo per IPv6, non supporta IPv4==.

![[62k.png]]

## IPv6
IPv6 is the latest version of the Internet Protocol and is designed to replace IPv4, offering a much larger address space.

**Campi principali:**
- **Version**: sempre 6
- **Traffic Class**: priorità del pacchetto
- **Flow Label**: etichetta per flussi che richiedono trattamento speciale
- **Payload Length**: dimensione del payload
- **Next Header**: indica il protocollo successivo (UDP/TCP) o estensioni
- **Hop Limit**: sostituisce il TTL di IPv4
- **Indirizzi sorgente e destinazione**

**Extension Headers:**
- Posizionati tra header IPv6 e livello trasporto
- Processati solo dalla destinazione finale (forwarding più veloce)
- Includono frammentazione, autenticazione, opzioni varie

**Differenze rispetto IPv4:**
- **Rimosso checksum header** (già presente nel MAC)
- **Rimossa frammentazione dai router** - solo i dispositivi finali possono frammentare usando Path MTU Discovery
- **Opzioni sostituite** da puntatori agli extension header

>A flow is a stream of packets that need consistent treatment (e.g., video stream). A flow is characterised by source and destination, protocol, port. Using traffic IDs allows to make traffic engineering more efficient.

![[63k.png]]![[64k.png]]

### IPv6 Addressing 
IPv6 addresses are 128 bit long, arranged in eight groups written in hexadecimal, each of which is 16 bits (IPv4 addresses are 32 bit long).
`example: 3FFE:085B:1F1F:0000:0000:0000:00A9:1234`

There are three **IPv6 address types**:
- ==Unicast== (comunicazione uno a uno tra due endpoint specifici).
- ==Anycast== (un singolo indirizzo IP è condiviso da dispositivi in ​​più sedi. I router indirizzano i pacchetti indirizzati alla destinazione la cui posizione è più vicina al mittente).
- ==Multicast== (la trasmissione dei dati è indirizzata a un gruppo di computer di destinazione contemporaneamente)

An **IPv6 network interface** has multiple addresses:
- ==Link local address==: Valido **solo all'interno del collegamento locale**, si calcola spesso partendo dall’**indirizzo MAC** del dispositivo (È usato per comunicazioni a **1 hop di distanza**.). Serve per:
	-  **scoperta dei vicini** (neighbor discovery)
	- **Scoperta dei router**
	- Comunicazioni interne al link (non passa da router)
- ==Site-local address==: Simile a un **indirizzo IPv4 privato** (192.168.XX.XX), valido **solo all'interno della rete aziendale o domestica**, non è instradabile su Internet.
- ==Global address==: È **instradabile su Internet**, Identifica univocamente il dispositivo nella rete globale IPv6.

![[2Semester/IOT/Image IOT2ESONERO/237.png]]

**Why do we need a link-local address?**
IPv6 introduce un cambiamento fondamentale **sostituendo il vecchio protocollo ARP con il Neighbor Discovery Protocol (NDP)**. Mentre ARP operava al livello 2 (Ethernet), NDP funziona al livello 3 utilizzando ICMPv6, rendendo il sistema più integrato e sofisticato.

```ad-info
title: ICMP Ipv4 vs ICMP Ipv6

ICMPv6 rappresenta un'evoluzione significativa rispetto all'ICMP di IPv4. Se l'ICMP tradizionale si limitava principalmente alla segnalazione di errori e alla diagnostica come il ping, ICMPv6 incorpora funzionalità molto più ampie che includono la scoperta dei dispositivi vicini, dei router e dei prefissi, oltre al rilevamento di indirizzi duplicati e ai reindirizzamenti. Queste capacità aggiuntive sono essenziali per permettere la configurazione automatica che caratterizza IPv6.
```

Il funzionamento di NDP si basa sui messaggi ICMPv6 Neighbor Solicitation per risolvere gli indirizzi MAC, utilizzando come fondamento gli indirizzi link-local. Questi indirizzi  permettono ai dispositivi di comunicare tra loro per configurazione e manutenzione anche prima di ottenere indirizzi globali. Questa architettura consente ai nodi IPv6 di eseguire operazioni di rete essenziali in modo completamente autonomo, senza dipendere da meccanismi esterni di assegnazione degli indirizzi.

## 6LoWPAN networks
La rete ==6LoWPAN== è **collegata alla rete IPv6 tramite un router edge**.
L'edge router gestisce:
1) lo scambio di dati tra i dispositivi 6LoWPAN e Internet (o altra rete IPv6).
2) Lo scambio di dati locali tra i dispositivi all'interno della 6LoWPAN.
3) generazione e manutenzione della rete 6LoWPAN.
Comunicando in modo nativo con IP, le reti 6LoWPAN sono collegate ad altre reti semplicemente utilizzando router IP. Le reti 6LoWPAN operano tipicamente ai margini, come reti stub (i dati che entrano nella rete sono destinati a uno dei dispositivi della 6LoWPAN).


![[65k.png|500]]

## Adaptation Layer
Nelle reti IoT a bassa potenza e alta perdita (LLN), come quelle basate su IEEE 802.15.4, i pacchetti possono essere al massimo di **127 byte**. Tuttavia, le **intestazioni IPv6 (40 byte)**, **UDP (8 byte)** e il **MAC layer (~25 byte)** lasciano pochissimo spazio per i dati applicativi (circa 54 byte).  
Questo crea un’enorme inefficienza, perché **oltre metà del pacchetto è occupata da overhead**.

Per risolvere il problema si introduce un **Adaptation Layer**, che:
- comprime le intestazioni (IPv6 e UDP),
- riduce il traffico non essenziale,
- permette di trasmettere più dati utili,
- e mantiene la **compatibilità con l’infrastruttura IPv6 standard**.

Questo livello è essenziale per rendere **IPv6 utilizzabile in ambienti IoT con vincoli severi**, garantendo al contempo l'interoperabilità con reti più ampie.

## Header Compression
Il modo in cui le intestazioni possono essere compresse è uno dei fattori che hanno portato 6LowPan a supportare solo IPv6 e non IPv4. La compressione delle intestazioni di 6LoWPAN cambia a seconda della release del protocollo. Ad alto livello:
- La compressione 6LoWPAN funziona sfruttando le informazioni condivise che tutti i nodi conoscono grazie alla loro partecipazione alla rete locale (contesti, prefissi).
- Omette alcuni campi di intestazione standard assumendo i valori comunemente utilizzati.
- Omette le informazioni che possono essere dedotte dalle intestazioni MAC.

![[66k.png]]
![[67k.png]]
![[68k.png]]
![[69k.png]]
![[70k.png]]
![[71k.png]]
![[72k.png]]
![[73k.png]]
![[74k.png]]
![[75k.png]]
![[76k.png]]

## Routing
6LoWPAN supporta **due modalità di routing**, a seconda del livello del protocollo in cui avviene l’instradamento:

- ==Mesh-under==.
	- Il **routing avviene al livello link (MAC)**, utilizzando gli indirizzi MAC IEEE 802.15.4.
	- I pacchetti vengono inoltrati tra nodi senza modificare l’intestazione IP.
	- È adatto a **reti locali piccole**, dove esiste **un solo router IP** (l'**edge router**).
- ==Route-over==.
	- Il **routing avviene al livello IP**, come in una rete IPv6 tradizionale.
	- Ogni nodo che instrada pacchetti deve essere in grado di gestire l’**intero stack IP** 
	- È usato in **reti più grandi e complesse**, più **scalabili e potenti**
	- Ogni router è responsabile del forwarding a livello IP tra segmenti della rete.

![[77k.png]]

## RLP (at a very high level)
==RLP (Routing Protocol for Low-power and Lossy Networks)== is the **most widely used routing protocol for route-over 6LoWPAN networks**.

It is a Distance-Vector Routing protocol that creates a routing tree called Destination Oriented Directed Acyclic Graph (DODAG), typically rooted at the gateway or an edge router.
Each node in the network is assigned a rank that represents its “distance” from the root.

Ranks are assigned to nodes based on the Objective Function (OF) that the routing wants to optimise (e.g., number of hops `[MIN]`, energy consumption `[MIN]`, reliability - avoiding lossy links `[MAX]`, etc)

## Fragmentation
Per consentire la trasmissione di frame IPv6 su collegamenti IEEE 802.15.4, potrebbe essere necessario dividere i frame IPv6 in diversi segmenti più piccoli (frammentazione).

Infatti, sebbene la compressione dell'intestazione di 6LoWPAN possa risparmiare molti byte, il carico utile dei frame è ancora molto piccolo in IEEE 802.15.4. Se si esegue la frammentazione, i frame di frammentazione vengono suddivisi in segmenti più piccoli.

Se viene eseguita la frammentazione, vengono generate le intestazioni di frammentazione per riassemblare i pacchetti nell'ordine corretto.

>I router IPv6 non eseguono la frammentazione, che è completamente gestita dal lato sorgente.

## Fragmentation - routing modes
I nodi intermedi non sono interessati dalla frammentazione dei pacchetti IPv6. 
Eseguono l'inoltro dei pacchetti a livello di collegamento.
- I nodi intermedi elaborano i pacchetti al livello 3 (IP).
- Quando l'intestazione del pacchetto IPv6 è frammentata, viene suddivisa in più frammenti.
- I frammenti devono essere riassemblati a ogni hop prima di essere elaborati.
	- Ogni nodo intermedio deve attendere che tutti i frammenti arrivino, li riassembli, li ispezioni e li riframmenti prima di instradarli di nuovo (IPv6 viene terminato a ogni nodo).
- L'intestazione della frammentazione include i campi Datagram Size, Datagram Tag e Datagram Offset per identificare il frammento e poter riassemblare l'intero pacchetto IPv6.

# Application protocols

## Protocolli a livello applicativo nell'IoT
I due protocolli più comuni a livello applicativo nell'IoT:
- ==MQTT== (Message Queuing Telemetry Transport): **protocollo leggero di tipo publish-subscribe per comunicazione machine-to-machine. Progettato per connettere server con dispositivi con risorse limitate** (dispositivi IoT). Basato su TCP
- ==CoAP== (Constrained Application Protocol): **protocollo applicativo Internet basato su UDP progettato per dispositivi vincolati che devono comunicare su reti vincolate** (reti a basso consumo, con perdite di pacchetti)

## MQTT
==MQTT== utilizza un **modello publish/subscribe per separare i mittenti (publisher) dai ricevitori (subscriber)**. Un broker centrale gestisce tutta la comunicazione:

- Il broker riceve i messaggi dai publisher, li filtra e li instrada a ciascun subscriber appropriato
- Questa architettura offre tre vantaggi chiave di disaccoppiamento:
    1. **Disaccoppiamento spaziale**: Publisher e subscriber operano senza conoscere i dettagli di rete reciproci (IP, porte)
    2. **Disaccoppiamento temporale**: La comunicazione persiste anche quando i dispositivi non sono attivi o connessi simultaneamente
    3. **Disaccoppiamento sincrono**: Le operazioni avvengono senza blocco - publisher e subscriber interagiscono in modo asincrono

Il broker gestisce tutta la logica di instradamento, abilitando messaggistica IoT scalabile e resiliente.

### Componenti di MQTT
Un ==client MQTT== è **qualsiasi dispositivo** (da un server a un microcontrollore) **che esegue una libreria MQTT**. Se un client invia un messaggio, agisce come publisher, se lo riceve come subscriber (qualsiasi dispositivo che comunica via MQTT è un client MQTT)

Un broker MQTT è il sistema backend che coordina i messaggi tra client. I suoi ruoli includono:
- ricevere e filtrare messaggi
- identificare i client iscritti a ciascun messaggio e inviarglielo
- autorizzare e autenticare i client MQTT
- inoltrare messaggi ad altri sistemi per ulteriori analisi

I client e broker MQTT iniziano a comunicare usando una connessione MQTT.
- I client avviano la connessione inviando un messaggio CONNECT al broker.
- Il broker conferma la connessione rispondendo con un CONNACK.
- I client non si connettono mai tra loro, solo con il broker.
- I broker possono essere:
	- broker gestiti, cioè servizi che permettono di usare i loro broker ospitati
	- Broker self-hosted richiedono l'installazione su un server con IP statico. Implementazioni open source includono Mosquitto e HiveMQ

### MQTT continua
Caratteristica chiave di MQTT sono i ==topic==. I topic MQTT sono **parole chiave che il broker usa per filtrare i messaggi**. Supporta un approccio architetturale stateful, mantenendo sessioni persistenti. In scenari IoT con connettività instabile, MQTT permette ai client di riconnettersi e riprendere le comunicazioni senza perdere contesto.

![[78k.png]]

### Pacchetti di controllo MQTT
Il protocollo MQTT usa tipi di pacchetto distinti per diverse operazioni, ciascuno con struttura consistente:

**Pacchetto CONNECT**
- _Intestazione fissa_: Identifica il tipo come CONNECT
- _Intestazione variabile_: Specifica versione protocollo, nome e flag connessione (sessione pulita, QoS, ecc.)
- _Payload_: Contiene credenziali client (ID, username, password) e parametri connessione

**Pacchetto PUBLISH**
- _Intestazione fissa_: Identifica l'operazione PUBLISH
- _Intestazione variabile_: Include nome topic e ID pacchetto (per tracciamento QoS)
- _Payload_: Contiene i dati effettivi del messaggio (es. letture sensore come "31°C")

**Pacchetto SUBSCRIBE**
- _Intestazione fissa_: Identifica la richiesta SUBSCRIBE
- _Intestazione variabile_: Contiene identificatore univoco pacchetto
- _Payload_: Elenca topic a cui iscriversi con relativi livelli QoS richiesti

> Questa struttura assicura comunicazione efficiente e standardizzata tra client e broker MQTT.

## CoAP
==CoAP (Constrained Application Protocol)== segue un modello client-server dove i client richiedono servizi e i server rispondono. Progettato per efficienza, include:  

**Architettura Orientata alle Risorse**  
- Ogni risorsa (dati come immagini, testo o letture sensori) è identificata da un URI  
- Usa principi RESTful, mantenendo statelessness (ogni richiesta contiene tutte le info necessarie)  

**Metodi Simili a HTTP**  
- *GET*: Recupera una risorsa  
- *POST*: Crea una risorsa  
- *PUT*: Aggiorna/crea una risorsa specifica  
- *DELETE*: Rimuove una risorsa  
- *OBSERVE* (estensione GET): Riceve aggiornamenti in tempo reale  

**Trasporto & Efficienza**  
- Funziona su UDP per comunicazione leggera  
- Supporta messaggistica asincrona senza acknowledgment per risparmiare energia  

Questo design rende CoAP ideale per reti con risorse limitate mantenendo funzionalità web-like.

### CoAP - Formato Messaggio
- ==Versione==: 2 bit. Rappresenta la versione del protocollo CoAP
- ==Tipo==: 2 bit per 4 tipi di messaggi
	- richiesta: 0: confermabile (si aspetta ACK)
	- 1: non confermabile
	- risposta: 2: ACK, 3: RESET - messaggio ricevuto ma non processabile (es. contesto mancante)
- ==Contatore Opzioni==: 4 bit
- ==Codice==: 8 bit. Indica il metodo e se il messaggio è una richiesta o risposta.
- ==ID Messaggio==: 16 bit
- ==Token==: dimensione variabile (0-8 byte). Identificatore locale client per abbinare richieste e risposte
- ==Opzioni==: dimensione variabile, includono metadati aggiuntivi (tipo media, durata risorse, ecc)
- ==Payload==: dimensione variabile. Tipicamente una rappresentazione della risorsa richiesta

![[79k.png|400]]