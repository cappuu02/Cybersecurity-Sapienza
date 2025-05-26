#  Prima delle Reti Cellulari
Le comunicazioni avvenivano esclusivamente tramite **linee telefoniche fisse**.  
Inizialmente, le chiamate venivano **instradate manualmente** da operatori umani con **centrali a commutazione manuale**.

> 🧠 Con l’introduzione degli **scambi elettromeccanici**, la selezione del numero attivava fisicamente il collegamento con il destinatario.  
> Oggi, tutto è gestito da **commutazione digitale**: i segnali sono instradati da sistemi digitali.

# 📡 Generazioni delle Reti Cellulari

## 1G – Prima Generazione (1979)
- **Comunicazione analogica pura**
- Nessuna cifratura, **qualità audio scarsa**
- **Copertura e capacità molto limitate** (poche persone utilizzavano questa tecnologia)

## 📱 2G – Seconda Generazione (1990)
- Introduzione della **digital modulation**
- Basata su **GSM (Global System for Mobile COmmunications)**, standard europeo unificato
- Supporto per **SMS** oltre alle chiamate vocali

## 🌐 3G – Terza Generazione (2000)
- Connessione anche alla **cellular voice network e public internet**
- Aumento notevole del **data rate**
- Inizio della diffusione di massa degli smartphone


# Concetto di Rete Cellulare
Le vecchie reti usavano **pochi trasmettitori potenti** per grandi aree utilizzando canali dedicati per ciascun utente → **poca scalabilità**.  
Il concetto cellulare divide il territorio in **celle**, ognuna servita da una **base station (ricevitore e trasmettitore)** a bassa potenza.

> ✅ Ad ogni cella viene assegnata una parte del numero totale di canali disponibili.
> 🚫 Le celle vicine non condividono frequenze → meno interferenze

## 🧩 Celle e Griglie

Le celle sono **aree geografiche** servite da una BS.  

> ℹ️ In realtà, la copertura è irregolare con aree scoperte e sovrapposizioni.
> Ma il modello a esagoni (Honeycomb grid) è lo **standard di riferimento**.

![[2Semester/IOT/Image IOT2ESONERO/238.png]]

```ad-abstract
title: Honeycomb grid
is the model typically used for for theoretical representation of area division in cellular networks. In reality, the coverage area looks more like this:

![[Pasted image 20250524163953.png]]

```

## Frequency Reuse
Il riutilizzo delle frequenze consiste nel separare le bande di frequenza in sottobande (ovvero canali diversi) e assegnare le stesse frequenze a diverse stazioni base (ovvero celle) sufficientemente distanti.

>Avoid collisions between neighbouring cells

![[240k.png]]
![[241k.png]]
![[242k.png]]

- Un cluster di celle è un gruppo di $N$ celle tale che la forma risultante del cluster sia tassellabile.
- All'interno di ciascun cluster, tutte le cellule sono associate a frequenze diverse.
- Un cluster di $N$ celle può essere costruito se $\exists i,j \in N : N = i^2 + i j + j^2$
- $N$ is the cluster size.
- Possible values of $N$ are $1,3,4,7,9,...$

> 🔁 Più grande è $N$, **più alta la capacità** ma anche le interferenze  .
> Ideale per ambienti urbani densi.

La ==distanza di riuso (reuse distance)== è la **distanza minima tra due celle che utilizzano la stessa banda di frequenza**. Si calcola con la formula $D = \sqrt{3Nr}$ dove $r$ è il raggio dell'esagono e $N$ è la dimensione del cluster. Il fattore di riuso $q=\frac{D}{r} = \sqrt{3N}$ rappresenta il rapporto tra la distanza di riuso e il raggio della cella.

Un ==reuse distance basso== **(N piccolo, r grande) è ideale per aree rurali o reti a bassa densità poiché comporta minori interferenze e richiede meno capacità**. Al contrario, un ==fattore di riuso elevato== **(N grande, r piccolo) è più adatto per aree urbane dense dove si verificano maggiori interferenze ma è necessaria più capacità.**

Il numero totale di canali radio disponibili in un cluster è dato da $S = kN$, dove $k$ rappresenta il numero di canali per cella e $N$ la dimensione del cluster. Se il cluster viene ripetuto $m$ volte all'interno di un'area, il numero totale di canali diventa $mS = mkN$.

![[243k.png|400]]

## Cell Sectoring
Se la distanza di riutilizzo D non è sufficientemente grande, due co-canali possono interferire tra loro. Una possibile soluzione è quella di posizionare antenne direzionali in ogni cella. Queste dividono virtualmente la cella in settori.

Nel settore a 3 celle, la banda di frequenza della cella è divisa in 3 sottobande. Un'antenna direzionale utilizza una di queste sottobande e dirige i segnali verso la sua direzione.

```ad-success
title: Advantages

Less interference between co-cells.
Better isolation.
More frequency reuse
Lower power needs
```


### ✂️ Cell Splitting

What do we do if the demand for more data rate increases in a region?
Suddividere le celle esistenti aggiungendo più stazioni base per fornire una maggiore velocità di trasmissione dati.

![[244k.png|200]]

>Le piccole celle possono essere **attivate o disattivate dinamicamente**

# 📶 4G LTE – Architettura Moderna

## Elements of the 4G LTE Architecture
![[245k.png]]

4G is based on the LTE (Long Term Standard) that is entirely IP-based, even for voice use Orthogonal Frequency Division Multiple Access (OFDMA) and Multiple Input Multiple Output (MIMO). It support Higher data rates, IoT applications and LPWA-based licensed band technology. 

### Dispositivi Mobili
- dispositivi mobili si connettono alle reti cellulari ed eseguono diverse operazioni. 
- Ogni device ha un **IP** come endpoint di rete e un **IMSI** (identificatore univoco) a 64 bit (memorizzato nella SIM)
- La SIM contiene info sull’**operatore** e i **servizi abilitati**

### 🗼 Base Station (BS)
La stazione base (BS) è una stazione fissa che copre un'area.  È composta da antenne trasmittenti e riceventi montate su una torre cellulare.

BS è responsabile della gestione delle risorse radio wireless e dei dispositivi mobili con la sua area di copertura. (I dispositivi mobili interagiscono con una stazione base per connettersi alla rete dell'operatore (ad esempio, Internet o la linea telefonica), in modo simile ai punti di accesso nelle reti WLAN.)

Forniscono la connessione dai dispositivi mobili ai gateway, interagiscono tra loro per gestire la mobilità dei dispositivi tra le celle e ridurre al minimo le interferenze tra le celle. Sono collegate tra loro tramite cavi, non tramite wireless.

### 🗃️ HSS – Home Subscriber Server
==HSS== è un database centrale usato nelle reti mobili contenente tutte le informazioni degli utenti che sono “abbonati” a quella rete, cioè che usano la rete come rete _domestica_ (la loro rete principale).  Le informazioni memorizzate nel HSS includono dati importanti come:
- L’identità dell’utente (es. IMSI, cioè l’ID unico della SIM)
- Le chiavi di autenticazione per verificare che l’utente sia autorizzato a usare la rete
- Le preferenze di servizio e altri dati di configurazione

>Ogni operatore di telefonia mobile ha il proprio Home Subscriber Server

## 🌐 Network Routers

### Serving Gateway (S-GW)
È un **router** che si trova tra il dispositivo mobile (es. il tuo smartphone) e il resto della rete con il compito di **instradare e inoltrare i pacchetti di dati utente** (cioè i dati che tu mandi e ricevi, come messaggi, video, navigazione web). Gestisce il traffico dati mentre ti muovi da una cella all’altra (handover), mantenendo la sessione dati attiva senza interruzioni.

>In pratica, il S-GW è il “ponte” tra il dispositivo mobile e il P-GW.

### Packet Data Network Gateway (P-GW)
**fornisce gli indirizzi IP** ai dispositivi mobili, cioè assegna un indirizzo IP al tuo smartphone per farlo comunicare su Internet. È il gateway verso il mondo esterno, cioè verso Internet o altre reti di dati. Dal punto di vista di Internet, il P-GW è come un router normale che smista il traffico verso il dispositivo mobile.


## 🔐 MME – Mobility Management Entity
l **Mobility Management Entity (MME)** è un elemento fondamentale della rete LTE responsabile della gestione della segnalazione e della mobilità dei dispositivi mobili, ad esempio quando un utente si sposta da una cella all’altra.

Quando un dispositivo mobile si connette alla rete, il MME interagisce con l’**Home Subscriber Server (HSS)** per autenticare il dispositivo, verificando che l’utente sia legittimo e autorizzato ad accedere.

In sintesi:
- L’**HSS** è il database centrale che conserva tutte le informazioni sugli utenti.
- Il **MME** utilizza queste informazioni per autenticare il dispositivo e gestirne l’accesso alla rete.

Inoltre, il MME configura i tunnel per il trasporto dei dati tra il dispositivo mobile e il Packet Data Network Gateway (P-GW), instradando così il traffico dati. Mantiene anche aggiornate le informazioni sulla posizione del dispositivo all’interno della rete, monitorando la cella a cui è collegato in ogni momento.

![[246k.png]]
![[247k.png]]
![[249k.png]]

## LTE Protocol Stack
Supporta l’intero **stack TCP/IP**.  
Le operazioni principali avvengono nel **Device Link Layer**:

![[250k.png]]

### Device Link Layer
Il livello Device Link è suddiviso in tre sottolivelli:

1. ==Sottolivello Packet Data Convergence==.
	-  Si trova appena sotto il protocollo IP.
	- Il protocollo Packet Data Convergence (PDCP)
	esegue:
	- Compressione dell'intestazione IP, per ridurre il numero di bit inviati sul collegamento wireless.
	- Crittografia/decifratura del datagramma IP.

2. ==Radio Link Control sublayer==.
	- The Radio Link Control Protocol (RLCP) performs:
	- Fragmenting and reassembly of IP datagrams that are too large to fit into the underlying link-layer frames.
	- Link-layer reliable data transfer.
	
3. ==Medium Access Control (MAC). The MAC layer performs==:
	- Transmission scheduling (assignment of transmission slots)
	- Error detection/correction functions

## 📡 LTE Radio Access Network

LTE utilizza la modulazione OFDM combinata con la divisione temporale (TDM) in slot da 0,5 ms. Ogni dispositivo mobile attivo riceve uno o più slot di 0,5 ms su una o più frequenze di canale. La riallocazione degli slot tra dispositivi può avvenire ogni millisecondo. Per variare la velocità di trasmissione si possono usare diverse tecniche di modulazione.

Lo standard LTE non specifica come assegnare gli slot: questa scelta è lasciata agli algoritmi di scheduling dell’operatore di rete.

![[251k.png|400]]



## Network Attachment
Il collegamento alla rete è il processo mediante il quale un dispositivo mobile si collega alla rete cellulare. Si divide in tre fasi:

1. **Attachment to a Base Station**: The mobile device initially searches all channels in all frequency bands and broadcasts signals every 5 ms and selects a base station to associate with
2. **Mutual Authentication**: The base station contacts the local MME to perform mutual authentication.
3. **Mobile-device-to-PDN-gateway Data Path Configuration**: MME Creates these tunnels

![[252k.png]]

## 🛣️ Tunnelling

🎯 Il tunnelling è una tecnica di comunicazione che incapsula pacchetti IP per garantire un accesso sicuro alle risorse e ai servizi di rete tramite Internet. Utilizzato in **VPN**, **IPv6** e nelle **reti cellulari (es. GTP-U in 4G)**


## 🔁 Handover
Il **handover** avviene quando un dispositivo mobile cambia la connessione da una base station a un’altra. Le cause principali sono:
- Forte degrado del segnale
- Sovraccarico della cella
- Mobilità dell’utente

Il dispositivo misura periodicamente il segnale della base station attuale e delle stazioni vicine e, sulla base di queste misure, la base station di origine può decidere di avviare il handover.

![[253k.png]]

1. La base station attuale (di origine) seleziona la base station di destinazione e invia una Richiesta di Handover.

2. La base station di destinazione verifica se dispone delle risorse necessarie per supportare il dispositivo mobile; se sì, le preassegna e invia un’acknowledgement alla base station di origine.

3. La base station di origine riceve l’acknowledgement della Richiesta di Handover e informa il dispositivo mobile dell’identità della base station di destinazione e delle informazioni per l’accesso al canale.

4. La base station di origine smette di inoltrare datagram al dispositivo mobile e, invece, inoltra qualsiasi datagram incapsulato che riceve alla base station di destinazione.

5. La base station di destinazione informa il MME che sarà la nuova base station che servirà il dispositivo mobile. Il MME riconfigura il tunnel tra il Serving Gateway e la base station.

6. La base station di destinazione conferma alla base station di origine che il tunnel è stato riconfigurato.

7. La base station di destinazione può iniziare a inviare datagram al dispositivo mobile.

> Permette la mobilità senza perdita di connessione

# 📡 NB-IoT – Narrowband IoT

**NB-IoT** è una tecnologia cellulare pensata per l’**Internet of Things**, che utilizza **banda stretta** per:

- Migliore **penetrazione** del segnale
- Maggiore **efficienza energetica**
- Supporto per **fino a 50.000 dispositivi per cella**

> ✅ Ideale per dispositivi che inviano **piccoli pacchetti di dati occasionali**

## ⚙️ Caratteristiche Tecniche

- Basato su **LTE**, ma con banda di appena **180 kHz**
- Richiede **SIM specifiche per NB-IoT**
- Moduli **economici**, bassa velocità, lunga durata

## Modalità di Deploy

1. **In-Band**: usa uno dei **PRB** (Physical Resource Block) dell’LTE
2. **Guard-Band**: sfrutta le bande protette laterali di LTE
3. **Standalone**: spettro dedicato, non condiviso

> 🧱 Perfetto per sensori in ambienti chiusi (es. scantinati)


