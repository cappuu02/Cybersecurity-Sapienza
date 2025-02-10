# Wireless and mobile networks 

>Computer networking a top-down approach

Handover: passing signal from two different base station

Tv system 
- 1 to $N$
- single direction broadcast
- channel access is well defined
- less amount of MPEG2 transmission stream
- Less challenging channel

Cellular System
- $N$ to $N$
- double direction transmission
- Millions of users compete for wireless channel.
- Huge amount of diverse data (Voice, Data, Video, Message…).
- Worst terrestrial wireless channel


>Il satellite si muove rispetto al movimento della terra.
>Quando i satelliti si muovo il segnale deve switchare tra uno e l'altro per far si che non venga perso il sistema. per avere questa configurazione abbiamo una costellazione di satelliti.


![[Network Infrastructures/images/32.png]]
IEEE (father of wifi). wifi was born in the framework of IEEE.

 wifi6 combine wifi access in local area that is fully integrated into the cellular network of the first (blue part).

## Wireless Access: range of operation of different techniques

![[Network Infrastructures/images/33.png]]
this image explain the typology of connection used outdoor and indoor.
## Wireless and mobile networks: context
Two important challenges:
- ==wireless==: communication over wireless link.
- ==mobility==: handling the mobile user who changes point of attachment to network.

## Element of a wireless network:
![[Network Infrastructures/images/34.png]]
![[Network Infrastructures/images/35.png]]


## Characteristic of selected wireless links
![[Network Infrastructures/images/36.png]]
Image that tells how far we can go if we stay indoor (a home, in the building, ecc...)
Bluetooth is the connectivity that has the lower range of connectivity.

## Network infrastructure mode
![[Network Infrastructures/images/37.png]]


## Ad-hoc mode
![[Network Infrastructures/images/38.png]]

# Wireless Link and network characteristics
difference from wired link
- Decrease signal strength: radio signal attenuates as it propagates through matter (path loss)
- Interference from other sources wireless network frequencies shared by many devices 
- Multipath propagation: radio signal reflects off objects ground, arriving at destination at slightly different times

>...make communications across wireless link much more difficult.

![[Network Infrastructures/images/39.png]]

**SNR**: signal-to-noise ratio
- larger SNR – easier to extract signal from noise (a “good thing”) 

SNR versus BER tradeoffs
-  given physical layer: increase power -> increase SNR->decrease BER
- given SNR: choose physical layer that meets BER requirement, giving highest throughput
- SNR may change with mobility: dynamically adapt physical layer (modulation technique, rate).

Multiple wireless sender, receivers create additional problems (beyond multiple access)
We can defines two types of problems:

![[Network Infrastructures/images/40.png]]

Before Introduce CDMA we need to talk about:

## TDMA (Time Division Multiple Access)


## FDMA (Frequence division Multiple Access)


## CDMA (Code Division Multiple Access)
Unique code assigned to each user, i.e, code set partitioning
- all users share same frequency but each user has own "chipping" sequence to encode data
- allows multiple users to coexist and transmit simultaneously with minimal interference 
Encoding" inner product
Decoding: Summed inner-product: (encoded data) X (Chipping sequence)

### Two sender Interface
![[Cybersecurity-Sapienza/Network Infrastructures/images/41.png]]



# Wifi: 802.11 wireless LANs

## 802.11 LAN Architecture
![[Network Infrastructures/images/42.png]]

## Channels Association
spettro diviso in canali a diverse frequenze
- L'amministratore dell'AP sceglie la frequenza per l'AP
- possibili interferenze: il canale può essere lo stesso scelto dall'AP vicino!
Host in arrivo: deve associarsi a un AP
- scansiona i canali, ascoltando i beacon frame contenenti il nome dell'AP (SSID) e l'indirizzo MAC
- seleziona l'AP con cui associarsi
- può eseguire l'autenticazione 
- poi in genere esegue il DHCP per ottenere l'indirizzo IP nella subnet dell'AP

## Passive and Active Scanning

![[Network Infrastructures/images/43.png]]

## IEEE 802.11: Multiple Access
avoid collisions: 2+ nodes transmitting at same time
802.11: CSMA - sense before transmitting
- don’t collide with detected ongoing transmission by another node
802.11: no collision detection!
- difficult to sense collisions: high transmitting signal, weak received signal due to fading
- can’t sense all collisions in any case: hidden terminal, fading
- goal: avoid collisions: CSMA/CollisionAvoidance

![[Network Infrastructures/images/44.png]]

## Protocollo CSMA/CA
**802.11 sender**
1. if sense channel idle for DIFS then transmit entire frame (no CD) sender receiver
2. if sense channel busy then start random backoff time timer counts down while channel idle transmit when timer expires if no ACK, increase random backoff interval, repeat 2.

**802.11 receiver**
if frame received OK
return ACK after SIFS (ACK needed due to hidden terminal problem)

![[Network Infrastructures/images/45.png]]


## Avoid Collisions (more)
**Idea**: Sender reserves channel use for data frames using small reservation packets
- sender first transmit small request-to send (RTS) packet to BS using CSMA
	- RTSs may still collide with each other
- BS Broadcasts clear-to-send CTS in response to RTS
- CTS heard by all nodes
	- sender trasmits data frame
	- other stations defer transmissions

## Collision Avoidance: RTS-CTS exchange
![[Network Infrastructures/images/46.png]]

## 802.11 Frame: Addressing
![[Network Infrastructures/images/47.png]]
![[Network Infrastructures/images/48.png]]
![[Network Infrastructures/images/49.png]]


## Mobility within same subnet
![[Network Infrastructures/images/50.png]]


## Advanced Capablities

****Adattamento della velocità**  
La velocità di trasmissione viene regolata dinamicamente in base alle variazioni dell'SNR (rapporto segnale-rumore) dovute agli spostamenti del cellulare:

1. **SNR basso** → **BER alto** (aumento degli errori di trasmissione).
2. Se il BER diventa eccessivo, si riduce la velocità di trasmissione per migliorare l'affidabilità.

**Gestione della potenza**  
I nodi entrano in modalità "sleep" per risparmiare energia:

- Il nodo si addormenta fino al prossimo **frame di beacon**.
- L'AP (Access Point) sospende l'invio di dati al nodo durante questo periodo.
- Il nodo si risveglia prima del beacon frame per verificare la presenza di dati in attesa.
- Resta attivo solo se ci sono frame **AP-to-mobile** da ricevere.

## Bluetooth
Less than 10m diameter, replacement for cables
![[Network Infrastructures/images/51.png]]

## Cellular Network (4G and 5G)
the solution for wide-area mobile Internet.

**similarities to wired Internet**
- widespread use of protocols HTTP, DNS, TCP, UDP, IP, NAT, separation of data/control planes...
- Interconnesso con Internet cablata.
- Rete cellulare globale: una rete di reti.
**differences from wired internet**
- Diverso livello di collegamento wireless.
- Mobilità come servizio di prima classe.
- "Identità" dell'utente (tramite SIM card).

## Elements of 4G LTE Architecture

![[Cybersecurity-Sapienza/Network Infrastructures/images/106.png]]
**Mobile Device (UE)**
Smartphone, tablet, laptop with 4G LTE radio
Identità internazionale dell'abbonato mobile (IMSI) a 64 bit, memorizzata sulla scheda SIM (Subscriber  Identity Module) della scheda SIM

**Base Station**
Posizionata ai margini della rete dell'operatore.
Gestisce le risorse radio wireless e i dispositivi mobili nella sua area di copertura ("cella").
Coordina l'autenticazione dei dispositivi con altri elementi della rete.
Svolge un ruolo attivo nella mobilità dell'utente, collaborando con le stazioni base vicine per ottimizzare l'uso delle risorse radio.

**Home Subscriber Service (HSS)**
Memorizza l'**IMSI**, ovvero la SIM e conserva informazioni sul piano tariffario dell-abbonato. Fornisce le credenziali e i chiavi crittografiche necessarie per autenticare il dispositivo mobile.


Collabora con l'MME (Mobility Management Entity) per l'autenticazione dei dispositivi.

**Mobility Management Entity (MME)**
Coordina l'autenticazione dei dispositivi con l'HSS della rete domestica.
- Gestisce i dispositivi mobili:
    - Passaggio tra celle (handover).
    - Monitoraggio e localizzazione dei dispositivi (tracking/paging).
Configura i percorsi (tunneling) dal dispositivo mobile al gateway P-GW.

**Serving Gateway (S-GW) and PDN Gateway (P-GW)**
Situati lungo il percorso dei dati da/verso i dispositivi mobili e Internet.
Il P-GW funge da gateway per la rete cellulare, fornendo il servizio di NAT (Network Address Translation).

## LTE: data plane control plane separation
![[Cybersecurity-Sapienza/Network Infrastructures/images/107.png]]
**Control plane**: gestisce e controlla il comportamento della rete.
- prende decisioni sul routing, gestisce autenticazione ed autorizzazione e stabilisce/termina connessioni (OSPF, BGP)
- P-GW: connessione con l'esterno.
**Data Plane**
- Instradare i pacchetti di dati basandosi sulle decisioni prese dal Control Plane.
- gestire il forwarding dei pacchetti dai dispositivi sorgente ai dispositivi di destinazione.
- Utilizza protocolli IP, TCP, UDP.

```ad-hint
Il **Control Plane** definisce come i dati debbano essere instradati, mentre il **Data Plane** esegue le istruzioni instradando i pacchetti in base alle regole definite. Entrambi sono fondamentali per il funzionamento delle reti moderne.

```

### First Hop
![[Cybersecurity-Sapienza/Network Infrastructures/images/108.png]]

![[Cybersecurity-Sapienza/Network Infrastructures/images/109.png]]
- **Downstream channel**: Trasmissione dai ripetitori (base station) verso il dispositivo. Utilizza tecniche come il Frequency Division Multiplexing (FDM) e il Time Division Multiplexing (TDM) all'interno di canali.
- **Upstream**: Trasmissione dal dispositivo verso la base station. Simile a OFDM per ottimizzare l'uso delle frequenze.

### Packet Core
**Tunneling**: mobile datagram encapsulated using _GPRS Tunneling Protocol (GTP)_, sent inside _UDP datagram_ to _S-GW_. S-GW re-tunnels datagrams to P-GW.

>Supporting mobility: only tunneling endpoints change when mobile user moves

### LTE data plane: associating with a BS
![[Cybersecurity-Sapienza/Network Infrastructures/images/110.png]]
1. La BS trasmette il segnale di sincronizzazione primario ogni 5 ms su tutte le frequenze. 
	- Le BS di più vettori possono trasmettere segnali di sincronizzazione. 
2. il cellulare trova un segnale di sincronizzazione primario, quindi individua il secondo segnale di sincronizzazione su questa frequenza. 
	- il cellulare trova quindi le informazioni trasmesse dalla BS: larghezza di banda del canale, configurazioni; informazioni sul vettore cellulare della BS 
	- il cellulare può ricevere informazioni da più stazioni base
3. il cellulare sceglie con quale BS associarsi (ad esempio, preferisce il vettore di origine) 
4. sono necessari altri passaggi per l'autenticazione, la creazione dello stato e la configurazione del piano dati. 

### LTE mobiles Sleep Modes
![[Cybersecurity-Sapienza/Network Infrastructures/images/111.png]]
As in WiFi, Bluetooth: LTE mobile may put radio to “sleep” to conserve battery:
- Light Sleep: After 100's msec of inactivity
	- wake up periodically (100’s msec) to check for downstream transmissions
- Deep Sleep: After 5-10 secs of inactivity
	- mobile may change cells while deep sleeping (nee to re-establish association)

## Global cellular network: a network of IP networks

![[Cybersecurity-Sapienza/Network Infrastructures/images/112.png]]

## 5G Part

>**Goal**: 10x increase in peak bitrate, 10x decrease in latency, 100x increase in traffic capacity over 4G

La nuova radio 5G: abbiamo due bande di frequenza FR1 e FR2, frequenze a onde millimetriche.
- Non è retrocompatibile con il 4G
- MIMO: antenne direzionali multiple
Frequenze a onde millimetriche: velocità di trasmissione dati molto più elevate, ma su distanze più brevi
- Celle Pico: diametro delle celle di 10-100 m
- È necessaria una distribuzione massiccia di nuove stazioni base
## Wireless Mobility
We are interested in connections where the devices moves amoung APs in the same provider network and among multiple provider networks.

The approach to solve the mobility problem are 
- **indirect routing**: Communication from correspondent to mobile goes through home network gateway
- **direct routing**: the correspondent gets foreign address of mobile, and send directly.
It's important to specificy the difference between Home network and visited network

**home network** is the network of the isp you have a service plan with (paid service eg. vodafone, tim)

**visited network** are any other network. Nowadays providers have agreements to provide internet connections even if you are not in your home network.

>The notion of global home network is specific for mobile network.

![[Cybersecurity-Sapienza/Network Infrastructures/images/113.png]]
When your mobile phone enter another country for example, usually it receives a message for roaming from your home network operator. The one device that informs your home network is the mobility manager.

## Indirect routing
The data you receive with your phone during roaming does this:

- other host uses home address as datagram
- home gateway receives datagram, forwards to remote gateway
- visited remote gateway router forwads to mobile
- visitede gateway router forwards reply from the mobile to the home network or directly to the other host


so this strategy is called indirect routing, it may be inefficient if the two devices are in the same network but solves the problem to maintain a connection (eg. TCP) when moving from home network to a visited one.

>This is transparent to the correspondent.
## Direct routing
Data flow is this:

- correspondent contacts home network of the mobile and gets the visited network where the mobile is.
- sends data directly to the visited network address
- visited network gateway forwards them to the the mobile
- replies from the mobile pass only through the visited network gateway

>Not inefficient unlike indirect routing
   Not transparent to the correspondent since he must gets the foreign address.

## Mobility in 4G networks
![[Cybersecurity-Sapienza/Network Infrastructures/images/114.png]]
## Configuring LTE control-plane elements
![[Cybersecurity-Sapienza/Network Infrastructures/images/115.png]]
Mobile communicates with local MME via BS control-plane channel.
MME uses mobile’s IMSI info to contact mobile’s home HSS.
	It check the euthentication, encryption, network service information...
BS, mobile selezionare i parametri per il canale radio del piano dati BS-mobile

## Configuring data-plane tunnels for mobile
![[Cybersecurity-Sapienza/Network Infrastructures/images/116.png]]
- **S-GW to BS tunnel**: when mobile changes base stations, simply change endpoint IP address of tunnel
- **S-GW to home P-GW tunne**l: implementation of indirect routing
- **tunneling via GTP**: mobile’s datagram to streaming server encapsulated using GTP inside UDP

## Handover between BSs in same cellular network
![[Cybersecurity-Sapienza/Network Infrastructures/images/117.png]]
![[Cybersecurity-Sapienza/Network Infrastructures/images/118.png]]
