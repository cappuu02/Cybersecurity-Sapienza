
# 📡 Tecniche di Accesso Multiplo nelle Reti Wireless

---

Quando più dispositivi trasmettono simultaneamente sullo stesso canale wireless, i segnali possono interferire generando **collisioni**. Esistono tre approcci principali per gestire questo problema:

1. **Lasciare che avvenga la collisione** – i pacchetti corrotti verranno ignorati.
    
2. **Collision Detection (CD)** – rilevare la collisione durante la trasmissione e ritrasmettere.
    
3. **Collision Avoidance (CA)** – evitare la collisione in anticipo; è efficace ma complesso.
    

---

## ⚙️ Collision Detection nelle Reti Cablate

Nelle reti cablate, i dispositivi possono rilevare le collisioni monitorando i segnali sul cavo durante la trasmissione. Se il segnale rilevato è diverso da quello inviato, si presume una collisione.

> 🔍 **Definizione – CSMA/CD**: _Carrier Sense Multiple Access with Collision Detection_ è un protocollo che ascolta il canale prima di trasmettere, e rileva collisioni in tempo reale. Usato storicamente in Ethernet, è oggi superato dalle connessioni full-duplex.

Per garantire che una collisione venga rilevata **prima del termine della trasmissione**, i pacchetti devono essere **sufficientemente brevi**. Questo spiega la scelta di dimensioni ridotte per i frame Ethernet nei primi standard.
- Caso 1:
	![[Pasted image 20250521144824.png|500]]![[Pasted image 20250521144855.png|500]]
- Caso 2:
	![[Pasted image 20250521144956.png|500]]

---

## 📶 Collision Detection nelle Reti Wireless

Le reti wireless rendono la collision detection molto più difficile, a causa di:

- **Attenuazione** del segnale (soprattutto oltre i 70 dB)
    
- **Degrado** del segnale con la distanza
    
- Impossibilità di rilevare la collisione in tempo reale
    

Un problema classico è quello del **nodo nascosto**:

> ⚠️ **Nodo Nascosto**: Quando due dispositivi non si vedono tra loro, ma entrambi parlano con lo stesso Access Point (AP), potrebbero trasmettere contemporaneamente causando collisioni che non possono rilevare direttamente.

Di conseguenza, **la collision detection non è efficace nel wireless**. Per questo si passa a metodi alternativi per gestire l’accesso al mezzo.

---

# 🧠 Protocolli MAC per Accesso Multiplo

Per gestire la condivisione del canale tra più dispositivi, si usano protocolli MAC (_Medium Access Control_) come:

- ⏱️ **TDMA** – Time Division Multiple Access
    
- 📡 **FDMA** – Frequency Division Multiple Access
    
- 🎲 **ALOHA** – Accesso casuale non coordinato
    
- 🔄 **MACA** – Collision Avoidance
    
- 🧬 **CDMA** – Code Division Multiple Access
    

---

## ⏱️ TDMA – Time Division Multiple Access

Nel **TDMA**, il tempo è suddiviso in **slot**, e ogni dispositivo trasmette **solo nel suo intervallo dedicato**. Ogni slot occupa tutta la banda disponibile.
![[Pasted image 20250521145139.png|500]]

Un **coordinatore centrale** assegna gli slot e trasmette un **burst di riferimento** che sincronizza gli utenti.

> 🧭 **Parametri chiave**:
> 
> - Numero di utenti
>     
> - Lunghezza degli slot
>     
> - Velocità di trasmissione
>     

Per evitare sovrapposizioni, ogni slot contiene un breve **guard time** che compensa ritardi di propagazione o errori di sincronizzazione.

### 🔁 Modalità operative

- **Half-Duplex**: slot diviso in _uplink_ e _downlink_
    
- **Full-Duplex + FDD**: trasmissione e ricezione avvengono contemporaneamente su **frequenze diverse**
    

### ✅ Vantaggi

- Massima efficienza spettrale
    
- Basso consumo energetico (i dispositivi possono andare in idle)
    
- Alta prevedibilità
    

### ❌ Svantaggi

- Richiede sincronizzazione precisa
    
- Latenza elevata in reti affollate
    
- Poco adatto a traffico _bursty_
    
- Overhead dovuto a guard time
    

---

## 📡 FDMA – Frequency Division Multiple Access

Nel **FDMA**, la banda viene suddivisa in **sotto-bande** (canali), ciascuna assegnata a un utente per tutta la sessione.
![[Pasted image 20250521145159.png|500]]

> 🎛️ **Definizione – Canale**: È una banda di frequenza centrata su una frequenza $f_i$ riservata a una singola comunicazione.

Non è necessaria sincronizzazione temporale, ma si usano **guard band** per prevenire interferenze tra canali adiacenti.

### 🔧 Tipi di FDMA

- **Centralizzato** (es. reti cellulari, satelliti)
    
- **Decentralizzato** (es. radio amatoriale, reti ad hoc)
    

### ✅ Vantaggi

- Nessuna attesa: ideale per traffico continuo
    
- Nessuna collisione
    
- Adatto a voce, radio, streaming
    

### ❌ Svantaggi

- Numero di utenti limitato dalla larghezza di banda
    
- Poco efficiente per traffico intermittente
    
- Richiede hardware costoso (filtri di precisione)
    

---

## 🎲 ALOHA – Accesso Casuale

**ALOHA** è una delle tecniche più semplici. Ogni nodo trasmette quando ha dati, senza coordinamento.
![[Pasted image 20250521145248.png|500]]

> 🔥 Se due nodi trasmettono nello stesso istante → **collisione**.  
> Il recupero dei dati è affidato alla ritrasmissione da livelli superiori.

### ⌛ Slotted ALOHA

Versione migliorata con **divisione in slot temporali**. Le trasmissioni partono solo all'inizio di uno slot, dimezzando la probabilità di collisione.
![[Pasted image 20250521145300.png|500]]
### 🚦 Miglioramenti ad ALOHA: CSMA

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


### 🛰️ Miglioramenti ad ALOHA: DAMA

Un'altra evoluzione è il **DAMA – Demand Assigned Multiple Access**, chiamato anche **Reservation ALOHA**.  
È impiegato in particolare nelle comunicazioni **satellitari**.
![[Pasted image 20250521145444.png|500]]

> 📋 Richiede un **coordinatore centrale**, come un satellite, per gestire le prenotazioni.

### 🔁 Fasi del protocollo:

- **🆓 Contention Phase**  
    Funziona come Slotted ALOHA:  
    i nodi inviano richieste in modalità casuale per **prenotare uno slot futuro**  
    → Le collisioni sono ancora possibili.
    
- **✅ Transmission Phase**  
    I nodi che hanno ricevuto conferma **trasmettono nei loro slot riservati**.  
    Nessun altro nodo può usare quegli slot → **zero collisioni**
    

> 📡 Il satellite raccoglie le richieste valide e distribuisce una **tabella di accesso** con i diritti per gli slot futuri.

---

## 📡 CSMA – Carrier Sense Multiple Access

**CSMA** introduce il concetto di ascoltare il canale prima di trasmettere:

- **Non-persistent**: aspetta un tempo casuale se il canale è occupato
    
- **p-persistent**: trasmette con probabilità $p$, altrimenti attende
    
- **CSMA/CA**: combina ascolto del canale con strategie di back-off
    

> 🛡️ Utilizzato in Wi-Fi tramite **RTS/CTS** per evitare collisioni

---

## 📡 DAMA – Demand Assigned Multiple Access

Protocollo con **prenotazione esplicita** degli slot, usato in satelliti.

### 🕑 Fasi:

1. **Contention**: i nodi inviano richieste in stile ALOHA
    
2. **Trasmissione**: i nodi trasmettono nei loro slot prenotati
    

---

## 🔄 MACA – Collision Avoidance

**MACA** affronta il problema dei nodi nascosti con un approccio distribuito e dinamico.

> 📡 Funziona anche senza coordinatore! Basato su messaggi **RTS/CTS/ACK**

### 🧱 Meccanismo:

1. **RTS (Request To Send)**: il mittente richiede il canale
    
2. **CTS (Clear To Send)**: il destinatario conferma e segnala agli altri di non trasmettere
    
3. **ACK**: conferma della ricezione dopo il pacchetto
    

> 🔍 Gli altri nodi ricevono il CTS e **si astengono dal trasmettere**, prevenendo collisioni.

### ✅ Vantaggi

- Risolve il problema del nodo nascosto
    
- Più equo rispetto ad ALOHA
    
- Riduce le collisioni in reti dense
    

### ❌ Svantaggi

- Aggiunge overhead per i messaggi di controllo
    
- Meno efficiente in reti molto affollate

___
## 🧬 CDMA – Code Division Multiple Access

**CDMA** utilizza il _Code Division Multiplexing_ per permettere a più dispositivi di trasmettere simultaneamente sullo **stesso canale** e nella **stessa frequenza**, assegnando a ciascuno un **codice univoco**.
![[Pasted image 20250521145554.png|500]]

> 📏 **Condizione fondamentale**: i codici devono essere **ortogonali**, ovvero il loro **prodotto scalare** dev'essere nullo:  
> a⋅b=0a \cdot b = 0a⋅b=0  
> Questo garantisce che i segnali non interferiscano tra loro.

### 🔢 Esempio semplificato

Supponiamo che:

- A voglia inviare il bit **1**, con codice: $a = 010011$
    
- B voglia inviare il bit **0**, con codice: $b = 110101$
    

Convertiamo 1 in +1 e 0 in -1:

- Codice A: $a = (-1, +1, -1, -1, +1, +1)$
    
- Codice B: $b = (-1, -1, +1, -1, +1, -1)$
    

Trasmissioni:

- A invia: $a \cdot (+1) = (-1, +1, -1, -1, +1, +1)$
    
- B invia: $b \cdot (-1) = (+1, +1, -1, +1, -1, +1)$
    

Il ricevitore percepisce la somma:  
c=a(+1)+b(−1)=(0,2,−2,0,0,2)c = a(+1) + b(-1) = (0, 2, -2, 0, 0, 2)c=a(+1)+b(−1)=(0,2,−2,0,0,2)

Applicando la correlazione:

- c⋅a=6⇒A ha inviato un 1c \cdot a = 6 \Rightarrow \text{A ha inviato un 1}c⋅a=6⇒A ha inviato un 1
    
- c⋅b=−6⇒B ha inviato uno 0c \cdot b = -6 \Rightarrow \text{B ha inviato uno 0}c⋅b=−6⇒B ha inviato uno 0
    

> ℹ️ Questo esempio è semplificato: nella realtà si tiene conto di rumore, lunghezza dei codici, e potenza del segnale.

---

### 🛠️ CDMA: Pro e Contro

✅ **Vantaggi**:

- Utilizza **l'intero spettro di frequenza** per ogni utente
    
- È **resistente al rumore** e alle interferenze
    
- Aggiunge un livello di **sicurezza e privacy** grazie alla codifica
    

❌ **Svantaggi**:

- Richiede **circuiti complessi** (es. ricevitori rake per multipath)
    
- La gestione dei codici è complessa
    
- Non scala bene con un numero elevato di utenti
    

> 📡 Viene usato principalmente in contesti **militari** e in **reti cellulari**, dove la complessità viene gestita dalle stazioni base.

---

# 🌐 Tipologie di Reti Wireless

## 📶 Wi-Fi (IEEE 802.11)

L'unità fondamentale è il **BSS (Basic Service Set)**:

- Include uno o più dispositivi Wi-Fi e un **Access Point (AP)**
    
- L'AP è connesso tramite Ethernet al router
    

> 🔄 **Ad-hoc mode**: i dispositivi comunicano direttamente, senza AP (es. AirDrop)

![[Pasted image 20250521145644.png|500]]

---

## 📱 Reti Cellulari

Costituite da:

- **Nodi stazionari** (le **base station**, BS)
    
- **Nodi mobili** (utenti)
    

Le BS:

- Sono alimentate costantemente
    
- Gestiscono decine/centinaia di dispositivi nella loro area
    
- Sono connesse da una **rete cablata**
    

I dispositivi mobili sono **a un solo hop** dalla BS.

---

## 🔗 MANET – Mobile Ad Hoc Networks

Reti **completamente decentralizzate**, costituite da **nodi mobili**:

- Nessuna infrastruttura fissa
    
- Si auto-organizzano
    
- Adattano il routing in tempo reale in base alla mobilità
    
- Coprono fino a centinaia di metri
    

> 🎯 Obiettivo: mantenere alta la qualità del servizio anche in condizioni dinamiche.

---

## 🌱 WSN – Wireless Sensor Networks

Le **sensor networks** sono composte da **centinaia/migliaia di nodi** dotati di sensori.

> 🔋 I nodi sono alimentati a batteria e spesso non possono essere ricaricati.

### ⚠️ Caratteristiche:

- Rete ad-hoc
    
- Cambi frequenti di topologia
    
- Nodi con **capacità computazionale e memoria limitate**
    
- **Consumo energetico** è il vincolo principale
    

> 💡 Necessari protocolli MAC specifici per massimizzare la durata dei nodi.

---

# 🔋 Consumo Energetico nelle WSN

Ogni attività consuma energia:

- 🔍 **Sensing**
    
- 🧠 **Elaborazione**
    
- 📡 **Comunicazione** (la più costosa)
    

### Fonti di spreco:

- **Collisioni** → ritrasmissioni
    
- **Overhearing** → pacchetti ricevuti non destinati
    
- **Idle listening** → ascolto continuo senza traffico
    
- **Overhead di controllo** → pacchetti non dati
    

---

# ⚡ Power Saving nei Sistemi IoT

Ogni componente ha un **profilo di consumo** diverso.

> 🧠 Idea: mettere in **sleep** o **idle** i moduli non necessari  
> ⚠️ Ma... lo sleep mode **riduce la reattività** del sistema.

![[Pasted image 20250521145849.png|500]]

___
# ⏰ Sincronizzazione nei dispositivi IoT

> ❗Se un nodo invia mentre gli altri dormono → pacchetto perso

## 🔄 Strategie:

- **Sincronizzare tempi di veglia e sonno**
    
- **Inviare beacon di presenza**
    
- **Concordare intervalli attivi**
    

---

# 🧠 Algoritmi MAC per il Risparmio Energetico

Utilizzati in protocolli come **ZigBee** e **Bluetooth**.
## 📡 Modalità Beacon:

- **NBT (Non-Beacon Tracking)**:  
    Il nodo si sveglia, invia beacon, e rimane attivo un po’. Se un altro nodo riceve il beacon, trasmette.
    ![[Pasted image 20250521150211.png|500]]
    
    > ⚠️ I Beacons possono collidere → usare ritardi casuali
    
- **BT (Beacon Tracking)**:  
    Sincronizzazione in stile TDMA, con un **coordinatore** che invia la time frame.
    
    > ⚠️ Unico punto di fallimento e problemi di drift del clock.
    
    **Esempio**:
	    ![[Pasted image 20250521150258.png|500]]![[Pasted image 20250521150308.png|500]]![[Pasted image 20250521150319.png|500]]![[Pasted image 20250521150343.png|500]]![[Pasted image 20250521150352.png|500]]![[Pasted image 20250521150404.png|500]]![[Pasted image 20250521150414.png|500]]


## 🌐 Multi-hop BT:

- I nodi diventano coordinatori locali
    
- Si crea un **albero di associazione**
    
- I figli si svegliano insieme al coordinatore

![[Pasted image 20250521150525.png|500]]

**Esempio**:
	![[Pasted image 20250521150547.png|500]]![[Pasted image 20250521150608.png|500]]

---

## 💤 LPE – Long Preamble Emulation (B-MAC)

- Modalità **asincrona**, senza beacon
    
- Il mittente invia **Write Requests** finché il ricevitore si sveglia

![[Pasted image 20250521150628.png|500]]

### Variante con ACK:

- Quando riceve WR, il nodo risponde con **Write ACK**
    
- Poi il dato viene trasmesso

![[Pasted image 20250521150647.png|500]]
### Variante con sincronizzazione locale:

- Il mittente **conosce già** gli orari di veglia approssimativi del ricevente → attende di conseguenza

![[Pasted image 20250521150703.png|500]]

---

# 🧩 MAC per WSN: Conclusione

## 🎯 Due approcci principali:

- **Contendenti (Contention-based)**  
    → es. ALOHA, CSMA, MACA, **S-MAC**
    
- **Non contendenti (Contention-free)**  
    → es. TDMA, FDMA, CDMA, **TRAMA**












---
---
---
---
---
---
# Sensor MAC (S-MAC) (1)
Sensor-MAC (S-MAC) protocol is an energy efficient protocol specifically designed for WSNs. Sensor network scenario:
- most communication occurs between nodes as peers, rather than to a single base station.
- Suitable for applications that are latency-tolerant.
- Main goal: improve energy efficiency while maintaining good scalability and collision avoidance.

# Sensor MAC (S-MAC) - frame
Periodic listen and sleep mechanism to establish a low-duty-cycle operation on each node.
- Frame: complete cycle of listen and sleep periods.
-  Frame begins with a Listen period, further divided into smaller intervals for sending or receiving SYNC, RTS, CTS packets.

![[25z.png]]
# Sensor MAC (S-MAC) - neighbour coordination
All nodes are free to choose their own listen and sleep schedules.
-  To reduce control overhead, however, neighboring nodes coordinate their sleep schedules and try to adopt the same schedules, rather than randomly sleep on their own.
- To establish coordinated or synchronized sleep schedules, each node exchanges its schedule with all its immediate neighbours by periodically broadcasting a SYNC packet.

# Sensor MAC (S-MAC) - collision avoidance
![[1K.png]]

# Traffic Adaptive Medium Access (TRAMA) (1)
TRAMA employs a traffic adaptive distributed election scheme to decide transmission schedules. TRAMA consists of three components:
- **Neighbour Protocol (NP)**.
- **Schedule Exchange Protocol (SEP)**.

>allow nodes to exchange two-hop neighbour information and their schedules

Adaptive Election Algorithm (AEA), which uses neighbourhood and
schedule information to select the transmitters and receivers for the
current time time.

**TRAMA** assumes a single, time-slotted channel for both data and signaling transmissions.
![[2k.png]]
Each node transmits by selecting a slot randomly
- Nodes can access the network during this period
- All nodes must be in transmitting or listening mode
- Nodes share neighbourhood information
- Nodes share schedules for transmission slots
- Time syncronization

Nodes share information with the` ==node protocol NP==:
- Signaling packets carry incremental 1-hop neighbour updates.
- If no updates, signaling packets are sent as “keep-alive” beacons.
- A node times out a neighbour if it does not hear from it for a certain amount of time.
- knowing 1-hop neighbours of a node’s neighbours allows 2- hop neighbourhood knowledge.
-  Nodes share schedule messages containing their traffic needs (who they wants to talk to, and when).
- Nodes listen to their neighbours' schedules and build a conflict-free schedule using a priority function
- Conflicts (multiple nodes wanting the same slot) are resolved using the Adaptive Election Algorithm

> Se conosco il vicino del vicino conosco due hop!

# Adaptive Election Algorithm - TRAMA
Each transmission slot can be used by only one node in a two-hop neighbourhood to avoid interferences. The priority of a node for a given time slots is computed as an hash function that is public and deterministic.

All nodes compute the same priority values for their 2-hop neighbours, so they all agree on who has the highest priority for a given slot. Only nodes that have data packets to send are eligible for having a time slot allocated. The node with the highest priority wins the slot and gets to transmit. Other nodes go to sleep or prepare to receive if they are the intended receiver.

# Association and neighbour discovery in IEEE 802.11 (WiFi)

## Neighbour discovery in Wired Networks: Link-Layer Discovery Protocol (LLDP) (1)
LLDP is protocol used by network devices for advertising their identity,
capabilities, and neighbours on a local area network connected through
Ethernet. Periodically (e.g., every 30 seconds) switches/routers exchange LLDP
messages with their physical neighbours. similar to hello messages, used for “introducing” themselves, contain records as chassis ID, system name, system description etc. 

>Common Cisco-Proprietary variant: Cisco Discovery protocol (CDP)

![[3k.png]]

>When we run LLDP, switches exchange LLDPUs with personal info.

```ad-example
Example: switches provided with ethernet/fiber ports (Eth/fa/Gi), forward packets at high speed. Can log into them and configure them.

```

**Can LLDP be used to discover neighbours in wireless networks?**
Wireless has additional challenges
- may have equivalent access points
- may need to discover “closest” neighbours
- neighbours may lie about who they are
Wireless protocols have been developed to solve these challenges:
- association, discovery, authentication

# Scanning
**Active Scanning**
NIC sends probe request frames and waits for probe responses from APs

**Passive Scanning**
listens for beacon frames from nearby APs.

>Access points periodically (default 100ms) send beacons with personal information (supported rates, transmission parameters) and what SSID they support (e.g., eduroam)

**What AP to choose?** 
.Select it manually, or the ones with highest SNR

## AP Association process
![[4k.png]]
