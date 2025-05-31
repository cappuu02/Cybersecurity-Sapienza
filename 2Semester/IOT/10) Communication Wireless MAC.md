 
# Tecniche di Accesso Multiplo nelle Reti Wireless
Quando più dispositivi trasmettono simultaneamente sullo stesso canale wireless, i segnali possono interferire generando **collisioni**. Esistono tre approcci principali per gestire questo problema:

1. **Lasciare che avvenga la collisione** – i pacchetti corrotti verranno ignorati.
2. **Collision Detection (CD)** – rilevare la collisione durante la trasmissione e ritrasmettere.
3. **Collision Avoidance (CA)** – evitare la collisione in anticipo; è efficace ma complesso.


## ⚙️ (CD) Collision Detection nelle Reti Cablate
Nelle reti cablate, i dispositivi possono rilevare le collisioni monitorando i segnali sul cavo durante la trasmissione. Se il segnale rilevato è diverso da quello inviato, si presume una collisione.

> 🔍 **Definizione – CSMA/CD**: _Carrier Sense Multiple Access with Collision Detection_ è un protocollo che ascolta il canale prima di trasmettere, e rileva collisioni in tempo reale. Usato storicamente in Ethernet, è oggi superato dalle connessioni full-duplex.

Per garantire che una collisione venga rilevata **prima del termine della trasmissione**, i pacchetti devono essere **sufficientemente brevi**. Questo spiega la scelta di dimensioni ridotte per i frame Ethernet nei primi standard.
- Caso 1:
	![[160k.png]]![[161k.png]]
- Caso 2:
	![[162k.png]]

Do we need different Media Access Control mechanisms for channel sharing in wireless networks? If so, why?


## Collision Detection nelle Reti Wireless
Le ==reti wireless rendono la collision detection molto più difficile==, a causa di:
- **Attenuazione** del segnale (soprattutto oltre i 70 dB)
- **Degrado (attenuation)** del segnale con la distanza
- Impossibilità di rilevare la collisione in tempo reale

Un problema classico è quello del **nodo nascosto**:

> ⚠️ **Nodo Nascosto**: Quando due dispositivi non si vedono tra loro, ma entrambi parlano con lo stesso Access Point (AP), potrebbero trasmettere contemporaneamente causando collisioni che non possono rilevare direttamente.

Di conseguenza, **la collision detection non è efficace nel wireless**. Per questo si passa a metodi alternativi per gestire l’accesso al mezzo.

![[163k.png]]


# 🧠 Protocolli MAC per Accesso Multiplo
Per gestire la condivisione del canale tra più dispositivi, si usano protocolli MAC (_Medium Access Control_) come:

- ⏱️ **TDMA** – Time Division Multiple Access
- 📡 **FDMA** – Frequency Division Multiple Access
- 🎲 **ALOHA** – Accesso casuale non coordinato
- 🔄 **MACA** – Collision Avoidance
- 🧬 **CDMA** – Code Division Multiple Access

## ⏱️ TDMA – Time Division Multiple Access
Nel **TDMA**, il tempo è suddiviso in **slot**, e ogni dispositivo trasmette **solo nel suo intervallo dedicato**. Ogni slot occupa tutta la banda disponibile.

![[164k.png]]

Un **coordinatore centrale** assegna gli slot e trasmette un **beacon** che sincronizza gli utenti.

> 🧭 **Parametri chiave**:
> - Numero di utenti
> - Lunghezza degli slot
> - Velocità di trasmissione

Per evitare sovrapposizioni, ogni slot contiene un breve **guard time** (margine di sicurezza temporale) che compensa ritardi di propagazione o errori di sincronizzazione.

![[165k.png]]

During each time slot, the communication between a device and the coordinator can be achieved in two ways:

- **Half-Duplex TDMA**: slot diviso in _uplink_ e _downlink_
- **Full-Duplex TDMA+ FDD**: trasmissione e ricezione avvengono contemporaneamente su **frequenze diverse**

 ==✅ Vantaggi==
- Massima efficienza spettrale
- Basso consumo energetico (i dispositivi possono andare in idle)
- Alta prevedibilità

==❌ Svantaggi==
- Richiede sincronizzazione precisa
- Latenza elevata in reti affollate
- Poco adatto a traffico _bursty_
- Overhead dovuto a guard time


## 📡 FDMA – Frequency Division Multiple Access
Nel **FDMA**, La banda è divisa in sottobande, ciascuna centrata sulla frequenza che identifica il canale (multiplexing a divisione di frequenza).

![[166k.png]]

Ogni sottobanda è assegnata a un singolo utente che la controlla per l'intero periodo di connessione.

Different bands are used for uplink and downlink. 


Non è necessaria sincronizzazione temporale, ma si usano **guard band** per prevenire interferenze tra canali adiacenti. (Anche se vengono assegnate frequenze diverse a ciascun utente, a causa di imperfezioni nei trasmettitori, nei ricevitori e nei filtri, i segnali possono riversarsi nelle bande di frequenza adiacenti.)

Possono avere o meno un coordinatore:
- **FDMA centralizzato** (alcune reti cellulari, reti satellitari). Il coordinatore assegna le frequenze agli utenti.
- **FDMA decentralizzato** Gli utenti selezionano le frequenze manualmente o algoritmicamente (radio, alcune reti ad hoc).

 ✅ ==Vantaggi==
- Nessuna attesa: ideale per traffico continuo
- Nessuna collisione
- Adatto a voce, radio, streaming

❌ ==Svantaggi==
- Numero di utenti limitato dalla larghezza di banda
- Poco efficiente per traffico intermittente    
- Richiede hardware costoso (filtri di precisione)


## 🎲 ALOHA – Accesso Casuale
**ALOHA** è una delle tecniche più semplici. Ogni nodo trasmette quando ha dati, senza coordinamento. (lavora come un TDMA senza coordinazione, ogni utente utilizza l'intera frequenza di banda).

Ogni stazione può accedere al mezzo in qualsiasi momento, seguendo uno schema di accesso casuale. Not only there is not a central coordinator, but nodes do not coordinate
among each other in a distributed fashion.

![[167k.png]]

> 🔥 Se due nodi trasmettono nello stesso istante → **collisione**.  
> Il recupero dei dati è affidato alla ritrasmissione da livelli superiori.

### ⌛ Slotted ALOHA
Versione migliorata con **divisione in slot temporali**. Le trasmissioni partono solo all'inizio di uno slot, dimezzando la probabilità di collisione.

![[168k.png]]

**Improvements**
Per ridurre ulteriormente la probabilità di collisioni, ALOHA è stato migliorato con il concetto di **Carrier Sense Multiple Access (CSMA)**.  
Qui i nodi **ascoltano il canale** prima di trasmettere:

- **🔄 Non-persistent CSMA**  
    Il nodo ascolta il canale e trasmette **subito** se lo trova libero.  
    Se è occupato, **attende un tempo casuale** prima di riprovare.
- **🧪 p-persistent CSMA**  
    Utilizzato in sistemi **a slot temporali**.  
    Il nodo ascolta il canale e, se libero, **trasmette con probabilità $p$**, oppure aspetta lo slot successivo con probabilità $1 - p$.
- **🛡️ CSMA con Collision Avoidance (CSMA/CA)**  
    Aggiunge un **meccanismo di back-off** in caso di canale occupato.  
    Spesso utilizza lo scambio **RTS/CTS** per evitare collisioni, come accade nelle reti **Wi-Fi (IEEE 802.11)**.

> 📌 **Carrier Sensing** riduce le collisioni **prima della trasmissione**, a differenza di ALOHA che agisce **dopo**.


Un'altra evoluzione è il **DAMA – Demand Assigned Multiple Access**, chiamato anche **Reservation ALOHA**.  È impiegato in particolare nelle comunicazioni **satellitari** 

![[169k.png]]

> 📋 Richiede un **coordinatore centrale**, come un satellite, per gestire le prenotazioni.


- **🆓 Contention Phase**  
    Funziona come Slotted ALOHA:  
    i nodi inviano richieste in modalità casuale per **prenotare uno slot futuro**  
    → Le collisioni sono ancora possibili.
    I nodi che hanno ricevuto conferma **trasmettono nei loro slot riservati**.  
    Nessun altro nodo può usare quegli slot → **zero collisioni**

> 📡 Il satellite raccoglie le richieste valide e distribuisce una **tabella di accesso** con i diritti per gli slot futuri.

- Transmission phase
	Stations transmit data during their reserved time slots.


## MACA – Collision Avoidance
Il problema del **nodo nascosto** può essere risolto tramite **sincronizzazione** con un **coordinatore**, tipicamente rappresentato da un **Access Point (AP)** o una **stazione base**.

- **ALOHA** e **Slotted ALOHA** sono protocolli molto semplici e flessibili, ma altamente soggetti a **collisioni**.
- I metodi basati su **Carrier Sensing** migliorano la gestione delle collisioni, ma **non risolvono** il problema del nodo nascosto. Un dispositivo può rilevare il canale come libero anche se altri dispositivi stanno trasmettendo, semplicemente perché non riesce a "sentirli".
- **MACA (Multiple Access with Collision Avoidance)** propone un meccanismo semplice per **evitare le collisioni** e affrontare efficacemente il problema del nodo nascosto.
- A differenza di altri approcci, **non richiede un coordinatore** centrale: è un **protocollo ad accesso casuale**, come ALOHA, ma introduce un meccanismo di **prenotazione dinamica** per le trasmissioni, riducendo così il rischio di collisioni.


### Funzionamento:
![[170k.png]]
![[171k.png]]


 ✅ ==Vantaggi==
- Risolve il problema del nodo nascosto
- Riduce le collisioni in reti dense

❌ ==Svantaggi==
- Aggiunge overhead per i messaggi di controllo
- Meno efficiente in reti molto affollate


## 🧬 CDMA – Code Division Multiple Access

**CDMA** utilizza il _Code Division Multiple Access_ per permettere a più dispositivi di trasmettere simultaneamente sullo **stesso canale** e nella **stessa frequenza**, assegnando a ciascuno un **codice univoco**.

📏 **Condizione fondamentale**: i codici devono essere **ortogonali**, ovvero il loro **prodotto scalare** dev'essere nullo:  $a⋅b=0 \hspace{0.2cm} a \cdot b = 0 \hspace{0.2cm}a⋅b=0$ . Questo garantisce che i segnali non interferiscano tra loro.

### 🔢 Esempio semplificato

![[173k.png]]
![[174k.png]]


>Richiede circuiti complessi nelle antenne del trasmettitore e del ricevitore che lo supportano.

La comunicazione con $n$ dispositivi richiede la programmazione del ricevitore per essere in grado di decodificare $n$ codici diversi (e anche di inviare con $n$ codici).



✅ ==Vantaggi==:
- Utilizza **l'intero spettro di frequenza** per ogni utente
- È **resistente al rumore** e alle interferenze
- Aggiunge un livello di **sicurezza e privacy** grazie alla codifica

❌ ==Svantaggi==
- Richiede **circuiti complessi** (es. ricevitori rake per multipath)
- La gestione dei codici è complessa
- Non scala bene con un numero elevato di utenti

> 📡 Viene usato principalmente in contesti **militari** e in **reti cellulari**, dove la complessità viene gestita dalle stazioni base.



# 🌐 Tipologie di Reti Wireless

Wireless Networks are very different from one another.
The WiFi routers, our computers/laptops and mobile devices connected to the router form a wireless network, but it is not a IoT network.

>Not all wireless networks are IoT networks, while most IoT networks are wireless networks.

## 📶 Wi-Fi (IEEE 802.11)
L'unità fondamentale è il **BSS (Basic Service Set)**:

- Include uno o più dispositivi Wi-Fi e un **Access Point (AP)**
- L'AP è connesso tramite Ethernet al router

> Can be “infrastructure-less”, meaning without an AP. Computers can organise in an “ad-hoc" fashion. (es. AirDrop)

![[175k.png]]

## Cellular Network
**Cellular network are wireless networks** consisting of both stationary and mobile nodes.

- ==Stationary nodes== are base stations (BS) connected by wired links, forming a fixed infrastructure.
- Il numero di ==nodi mobili== è molto maggiore del numero di BS. (Ogni nodo mobile si trova a un singolo salto di distanza dalla stazione base più vicina.)

Ogni BS copre un'ampia regione con poca sovrapposizione e serve decine o centinaia di nodi mobili nella regione. Le BS dispongono di un'alimentazione elettrica sufficiente e gli utenti mobili possono ricaricare comodamente le batterie dei loro telefoni.


## MANETs – Mobile Ad Hoc Networks
Una ==MANET== è una **rete peer-to-peer** che solitamente è composta da decine o centinaia di nodi mobili e copre un raggio fino a centinaia di metri. Tutti i nodi sono mobili e non esiste un'infrastruttura fissa (ad hoc).

La rete deve organizzare i nodi per formare un'infrastruttura di comunicazione, eseguire il routing e mantenere l'organizzazione e il routing in condizioni di mobilità. 

L'==obiettivo== principale di una MANET è fornire un'elevata qualità del servizio a fronte di un'elevata mobilità dei nodi.

![[176k.png]]



## WSN – Wireless Sensor Networks
Una ==rete di sensori wireless== è costituita da un gran numero di nodi sensore densamente distribuiti in un'area geografica.

I nodi sensore sono solitamente **alimentati a batterie** (capacità di alimentazione limitata). Spesso è difficile o impossibile sostituire o ricaricare le batterie per questi nodi.
Il **consumo energetico è una preoccupazione primaria**.

I nodi sono spesso distribuiti in modo ad **hoc**. Devono essere in grado di organizzarsi in una rete di comunicazione. La topologia di una rete di sensori cambia più frequentemente a causa sia dei guasti dei nodi che della mobilità. I ​​nodi sensore sono soggetti a guasti. I nodi sensore hanno capacità di calcolo e memoria molto limitate.
> Require specific MAC protocols to ensure long life to nodes.

### Energy Draw
All sensors’ activities consume energy:
- sensing
- data processing
- communication

Communication is the major source of energy consumption, for this reason it must be reduced as much as possible in a sensor network. During **communication**, the major sources of energy waste are:

- **Collisions** (retransmissions of packets)
- **Overhearing** (sensor node receives packets that are destined for other nodes)
-  **Idle Listening** (sensor node is listening to the radio channel to receive possible data packets while there are actually no data packets sent in the network)
- **Control Overhead**. A MAC protocol requires sending, receiving, and listening to a certain necessary control packets, which also consumes energy not for data communication.

# ⚡ Power Saving nei Sistemi IoT

Nei dispositivi IoT, ogni componente consuma energia in modo diverso. Per ridurre i consumi, è importante **disattivare o mettere in "sleep"** i moduli che non sono necessari in un certo momento.

> ✅ **Vantaggio:** Riduzione del consumo energetico  
> ⚠️ **Svantaggio:** Riduzione della **reattività** del sistema (cioè può rispondere più lentamente)

Alcuni componenti consumano molto anche in **idle** (attivi ma non operativi). Per questo si usano le **modalità sleep**, che riducono il consumo ma anche le funzionalità e la prontezza del dispositivo

È stato progettato un algoritmo per il risparmio energetico in un dispositivo IoT chiamato _cold tracker_, che:

- Rileva parametri ambientali
- Trasmette dati periodicamente
- Traccia la posizione GPS

### 🔧 **Problema: comunicazione tra dispositivi**
Se un dispositivo invia dati mentre gli altri sono in **modalità sleep**, quei dati **vanno persi**.

**First Solution: Sincronizzazione dei Tempi di Sleep/Wake**
![[177k.png]]
I nodi (es. A, B, C, D) si **sincronizzano** su periodi comuni in cui:
- Tutti sono **attivi** (per comunicare)
- Tutti sono in **sleep** (per risparmiare energia)

🔁 Questi periodi sono **configurabili**.

> ✅ Durante i periodi "active", i nodi possono scambiarsi i dati.

⚠️ **Problemi possibili:**
- Deriva dell’orologio (clock drift)
- Ritardi o interferenze nei messaggi di sincronizzazione
- Cambiamenti nella topologia (es. dispositivi che si spostano)

**Second Solution:  Notificare gli Altri Nodi quando si è Svegli**
![[178k.png]]
Ogni nodo, quando si **sveglia**, invia un **beacon** (segnale di presenza) agli altri dispositivi.
- Il nodo rimane attivo per un certo periodo dopo l’invio.
- Questo approccio è **più flessibile**, perché non richiede sincronizzazione rigida.

> ⚠️ **Problema:** Se gli altri nodi sono **addormentati** quando il beacon viene inviato, potrebbero **non riceverlo**.


## MAC-power saving algorithms
Gli ==algoritmi di risparmio energetico a livello MAC== (Medium Access Control) sono fondamentali per le **applicazioni IoT basate su reti di sensori wireless (WSN)** e sono utilizzati da molti protocolli IoT, come ZigBee e Bluetooth.

Questi algoritmi possono funzionare in due modalità principali:
- ==Modalità con beacon==:
    - **Beacon Tracking (BT)** – Il dispositivo si sincronizza regolarmente con i segnali beacon.
    - **Non-Beacon Tracking (NBT)** – Il dispositivo non segue i beacon in modo continuo, riducendo il consumo energetico.
- ==Modalità senza beacon==:
    - **Long Preamble Emulation (LPE)** – Si utilizza un preambolo lungo per garantire che il ricevitore sia attivo al momento della trasmissione, anche senza sincronizzazione tramite beacon.

### Non-Beacon Tracking (NBT)
L’**Asynchronous Wakeup Algorithm** è una tecnica utilizzata nelle reti IoT che si basa sull’**uso dei beacon**, ma **senza obbligare i nodi a rimanere costantemente in ascolto**.

### Funzionamento
- **Ogni nodo si risveglia periodicamente**, trasmette un beacon e **rimane attivo per un breve intervallo di tempo**, per poi tornare in stato di riposo.
- In questo modo, si ottiene un **consumo energetico ridotto**, mantenendo comunque la possibilità di comunicazione tra i nodi.

Quando un nodo deve inviare dei dati:
- Non trasmette immediatamente.
- Rimane **in stato attivo finché non riceve il beacon dal nodo destinatario**.
- **Appena riceve il beacon, trasmette i dati**.

> Questo approccio elimina la necessità di una sincronizzazione continua, ma introduce alcune sfide tecniche.


```ad-danger
title: Problematica 1
**Durata dei cicli attivo/riposo**
Occorre stabilire quanto tempo un nodo debba restare sveglio e per quanto debba dormire. 
Il nodo trasmittente deve restare in ascolto anche per lunghi periodi prima di trovare l’occasione per trasmettere.

Se l’intervallo medio tra due beacon è $t_{bi}$, il tempo medio di attesa per una trasmissione è circa $t_{bi}/2$, generando un certo overhead.
 


```

```ad-danger
title: Problematica 2
**Collisioni tra beacon**
    
Se due nodi utilizzano un programma di beaconing identico, potrebbero trasmettere i beacon nello stesso istante, causando interferenze continue.
        
Per ridurre questo rischio, è possibile introdurre un **ritardo casuale** nei beacon in caso di collisione rilevata.
        
Tuttavia, questa soluzione **non garantisce l’eliminazione completa delle sovrapposizioni**.

```


![[190K.png]]



### Beacon Tracking (BT)
**Un nodo viene eletto coordinatore**, indipendentemente dal protocollo (può essere il più affidabile o eletto con un algoritmo).
**Il coordinatore invia una struttura temporale (frame)**:
    - Il primo elemento è un **beacon** (burst di riferimento in TDMA).
    - Il resto del frame definisce il **programma di sonno/attività** che gli altri nodi seguono.
- Durante i periodi attivi, i nodi possono **trasmettere e ricevere dati**.
- **La durata del frame** varia da **15 ms a 256 s**.
- I nodi devono **sincronizzarsi**: per compensare **derive dell'orologio**, si svegliano leggermente prima dell'orario previsto.

![[179K.png]]
![[180K.png]]
![[181K.png]]
![[182K.png]]
![[183K.png]]
![[184K.png]]


### Multi hop Beacon Tracking 
![[185K.png]]
![[186K.png]]
![[187K.png]]

Nodes are still waking up a lot
Coordinators have to watch out not to collide with frames from other coordinators. This introduces complexity.

## Long Preamble Emulation (LPE)
La tecnica **Long Preamble Emulation**, anche nota come **B-MAC**, è una strategia usata in modalità **non-beacon** e completamente **asincrona**.

i nodi **non inviano beacon** e **non sono sincronizzati** tra loro, ma si risvegliano a intervalli regolari e prestabiliti. Anche se questi intervalli sono noti, non sono sincronizzati tra i nodi

Quando un nodo vuole trasmettere dati, inizia a inviare una serie di segnali chiamati **write request** (o una sorta di preambolo lungo). Questi segnali vengono trasmessi in continuazione finché il nodo destinatario non si sveglia e li riceve. A quel punto, il mittente trasmette effettivamente i dati.

>**Non serve alcuna sincronizzazione preventiva tra nodi**,

```ad-danger
title: Problema
Notevole spreco di energia a causa di trasmissioni attive per molto.

```

![[188K.png]]

### Long Preamble Emulation with Acknowledgement
Una prima ottimizzazione consiste nell’aggiungere un **acknowledgement** (ack) da parte del destinatario. In pratica, appena il nodo riceve una **write request**, invia un messaggio di conferma al mittente per indicare che è pronto a ricevere i dati. In questo modo, il mittente può **interrompere subito il preambolo** e inviare direttamente le informazioni, risparmiando energia.

![[189K.png]]


### Long Preamble Emulation with Acknowledgement after Local Synchronization 
Una variante ancora più efficiente è la **Long Preamble Emulation con acknowledgement e sincronizzazione locale**. In questo caso, se due nodi (ad esempio A e B) **hanno già comunicato in passato**, il nodo mittente (B) può **conservare informazioni sul ciclo di risveglio** del destinatario (A). Così facendo, B può stimare meglio **quando A si risveglierà**, evitando di iniziare la trasmissione troppo presto.

Permette di **ridurre ulteriormente la durata del preambolo**, migliorando l’efficienza energetica. Di contro, il metodo è più complesso da gestire

# MAC protocols for WSNs

## Contention-based and contention-free
I protocolli MAC (Medium Access Control) per le reti di sensori wireless (WSN) si dividono in due categorie principali: **a contesa** e **senza contesa**.

I protocolli ==a contesa== prevedono che i dispositivi competano per l’accesso al canale di comunicazione, utilizzando tecniche come ALOHA, CSMA o MACA.

I protocolli ==senza contesa==, invece, organizzano l’accesso al canale in modo centralizzato o pianificato per evitare collisioni. Utilizzano tecniche come TDMA, FDMA o CDMA. Un esempio è **TRAMA (Traffic Adaptive Medium Access)**, che adatta l’accesso al mezzo in base al traffico per migliorare l’efficienza.

# Sensor MAC (S-MAC) 
Il **Sensor-MAC (S-MAC)** è un protocollo progettato per le **Wireless Sensor Networks (WSN)**, con l’obiettivo principale di **ottimizzare il consumo energetico** mantenendo **scalabilità** ed evitando **collisioni**.

- Ottimizzato per **applicazioni tolleranti alla latenza**.
- Favorisce comunicazioni **peer-to-peer** tra nodi, piuttosto che con una singola stazione base.
- Utilizza tecniche di risparmio energetico basate su **cicli di ascolto e sospensione**.

## frame
Ogni nodo segue un ciclo periodico chiamato **frame**, composto da:
- *Periodo di ascolto**, suddiviso in:
    - Invio/ricezione di pacchetti **SYNC** (sincronizzazione)
    - Scambio di pacchetti **RTS/CTS** (controllo dell’accesso al canale)
- **Periodo di sonno**, in cui il nodo spegne la radio per risparmiare energia.

![[191K.png]]
## neighbour coordination
Anche se ogni nodo può scegliere autonomamente i propri orari, i nodi **coordinano i cicli di attività con i vicini** per ridurre il traffico di controllo:

I nodi **condividono periodicamente il proprio orario** tramite pacchetti **SYNC**, permettendo una sincronizzazione efficiente all’interno del vicinato.

![[192K.png]]

## Sensor MAC - collision avoidance
Il protocollo **S-MAC** adotta diversi meccanismi per **evitare collisioni** durante la trasmissione dei dati.

### 1. 📡 Carrier Sense (CS)

- **Fisico**: il canale è considerato **occupato** se l'energia rilevata supera una soglia predefinita, altrimenti è **libero**.
- **Virtuale**: viene usato il meccanismo **RTS/CTS (Request to Send / Clear to Send)** per prenotare il canale ed evitare interferenze tra trasmissioni multiple.

### 2. 🕓 Durata della trasmissione

- Ogni pacchetto include un **campo "duration"**, che specifica la durata stimata della trasmissione.
- Gli altri nodi utilizzano questa informazione per sapere quanto tempo il canale sarà occupato.

### 3. ⏳ Network Allocation Vector (NAV)
- Quando un nodo riceve un pacchetto **non destinato a sé**, legge il campo duration e imposta un **timer NAV**.
- Durante il periodo indicato dal NAV, il nodo **rimane in silenzio**, evitando collisioni sul canale.

### 4. 📤 Processo di invio di un pacchetto
1. Attendere il **tempo di backoff** (casuale)
2. Verificare se il canale è **libero**
3. Se libero, inviare un pacchetto **RTS**
4. Se viene ricevuto un pacchetto **CTS**, procedere con la **trasmissione dei dati**

# ⚙️ **Traffic Adaptive Medium Access (TRAMA)**
**TRAMA** è un protocollo MAC (Medium Access Control) progettato per **reti di sensori wireless (WSN)**, con l’obiettivo di:
- **Gestire l’accesso al canale radio in modo efficiente**
- **Evitare collisioni**
- **Risparmiare energia**

Con le seguenti caratteristiche:
- **Adattivo al traffico**: i nodi con maggior traffico ricevono più **slot temporali** per la trasmissione.
- **Funzionamento distribuito**: ogni nodo prende decisioni autonomamente, basandosi su **informazioni locali**, senza richiedere un coordinatore centrale.

## Componenti principali

### 1. **Neighbour Protocol (NP)**

Responsabile della scoperta e gestione dei nodi vicini
- I nodi scambiano pacchetti di segnalazione con aggiornamenti incrementali sui **vicini a 1 hop**.
- In assenza di aggiornamenti, vengono inviati **beacon keep-alive**
- Se un nodo non riceve segnali da un vicino per un certo periodo, lo considera **non attivo**.
- Conoscendo i vicini dei vicini, ogni nodo ottiene la **topologia a 2 hop**.

### 2. **Schedule Exchange Protocol (SEP)**
Gestisce lo scambio delle pianificazioni:
- I nodi condividono i **messaggi di schedulazione**, che indicano:
    - Chi vogliono contattare.
    - In quale slot temporale.
- Ogni nodo **ascolta le pianificazioni dei vicini** per costruire una **schedulazione senza conflitti**, usando una **funzione di priorità**.

### 3. **Algoritmo di Elezione Adattivo (AEA)**
Risolve eventuali conflitti:
- Se più nodi vogliono trasmettere nello stesso slot, l’**AEA elegge un solo trasmettitore**.
- Solo il nodo eletto trasmette; gli altri ricevono o entrano in **modalità sleep** per risparmiare energia.

## Funzionamento a slot
TRAMA utilizza un **canale radio a slot temporali fissi**, condiviso per dati e segnalazioni:
- Ogni nodo **seleziona uno slot casualmente** per comunicare.
- Durante uno slot, i nodi devono essere **attivi** per trasmettere o ascoltare.
- È necessaria una **sincronizzazione temporale** tra tutti i nodi.

# Adaptive Election Algorithm - TRAMA
Ogni ==slot di trasmissione può essere utilizzato da un solo nodo in un vicinato a due salti per evitare interferenze==. La priorità di un nodo per un dato slot temporale viene calcolata come una funzione hash pubblica e deterministica.

Tutti i nodi calcolano gli stessi valori di priorità per i loro vicini a due salti, in modo che tutti concordino su chi ha la priorità più alta per un dato slot. Solo i nodi che hanno pacchetti di dati da inviare possono avere uno slot temporale assegnato. Il nodo con la priorità più alta si aggiudica lo slot e può trasmettere. Gli altri nodi vanno in modalità sleep o si preparano a ricevere se sono i destinatari previsti.

# Association and neighbour discovery in IEEE 802.11 (WiFi)

## Neighbour discovery in Wired Networks: Link-Layer Discovery Protocol (LLDP) (1)
==LLDP== è un protocollo utilizzato dai dispositivi di rete per **pubblicizzare la propria identità**, le proprie **capacità** e i propri **vicini** su una rete locale connessa tramite Ethernet. **Periodicamente (ad esempio, ogni 30 secondi) switch/router scambiano messaggi LLDP con i propri vicini fisici**. Simili ai messaggi di benvenuto, utilizzati per "presentarsi", contengono record come ID chassis, nome del sistema, descrizione del sistema, ecc.


![[3k.png]]

>When we run LLDP, switches exchange LLDPUs with personal info.


**LLDP può essere utilizzato per individuare i vicini nelle reti wireless?**
La tecnologia wireless presenta ulteriori sfide:
- potrebbe avere punti di accesso equivalenti
- potrebbe dover individuare i vicini "più vicini"
- i vicini potrebbero mentire sulla propria identità
I protocolli wireless sono stati sviluppati per risolvere queste sfide:
- associazione, individuazione, autenticazione

# Scanning
**Active Scanning**
NIC sends probe request frames and waits for probe responses from APs

**Passive Scanning**
listens for beacon frames from nearby APs.

>Access points periodically (default 100ms) send beacons with personal information (supported rates, transmission parameters) and what SSID they support (e.g., eduroam)

**What AP to choose?** 
Select it manually, or the ones with highest SNR

## AP Association process
![[4k.png]]
