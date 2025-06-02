#  Mirai Botnet Attack
Nel mese di agosto 2016 è stato lanciato un attacco informatico tramite la botnet Mirai contro Dyn, un'azienda che gestisce una parte significativa dell'infrastruttura del sistema dei nomi di dominio (DNS) su Internet. L’attacco prendeva di mira dispositivi IoT come videocamere di sorveglianza e videoregistratori digitali (DVR), sfruttando le loro vulnerabilità: porte aperte, impostazioni di fabbrica predefinite e credenziali di accesso preinstallate.

Una volta infettati, questi dispositivi entravano a far parte della botnet Mirai, consentendo agli attaccanti di controllarli da remoto tramite un server centrale di comando e controllo (C2), dal quale venivano impartiti gli ordini per coordinare l’attacco su larga scala.

> I dispositivi IoT corrotti stavano invadendo internet


Nel **2017**, i ricercatori hanno scoperto vulnerabilità critiche in:
1. **Dispositivi medici impiantati** (pacemaker, defibrillatori di St. Jude Medical):
    - Nessuna autenticazione, che consente agli aggressori di:
        - Estrarre i dati dei pazienti
        - Scaricare le batterie inondando i dispositivi di messaggi
2. Monitor per bambini **Owlet** (un sensore a calzino connesso via Wi-Fi):    
    - Nessuna autenticazione nell'interfaccia, che consente agli aggressori di:
        - Interrompere le connessioni Wi-Fi
        - Disattivare gli avvisi critici

# Jeep Cherokees hack
Nel 2016, i ricercatori di sicurezza Charlie Miller e Chris Valasek scoprirono e dimostrarono l'esistenza di una vulnerabilità replicabile nei veicoli Jeep Cherokee, con un impatto tale da costringere il produttore a richiamare 1,4 milioni di automobili.

Analizzando la rete Sprint, riuscirono a individuare migliaia di veicoli esposti online. Attraverso questa rete, furono in grado di connettersi all’unità centrale Uconnect, la piattaforma di connettività a bordo del veicolo, dove scoprirono una vulnerabilità di esecuzione di codice da remoto. Questa falla consentiva loro di eseguire comandi arbitrari all’interno del sistema.
Una volta dentro, poterono inviare comandi direttamente alle centraline elettroniche (ECU), controllando così componenti fondamentali come lo sterzo, la frenata, la trasmissione e la velocità del veicolo.

# IoT environments
Decine di miliardi di dispositivi sono ormai connessi a Internet. Gli oggetti smart stanno diventando sempre più diffusi, con applicazioni che spaziano dalle smart city alle case intelligenti, passando per la sanità e la videosorveglianza.

Molti di questi servizi intelligenti richiedono agli utenti di condividere volontariamente informazioni personali, a volte anche sensibili, in cambio di funzionalità avanzate e più personalizzate.

In questo contesto, la sicurezza e la tutela della privacy dovrebbero essere priorità fondamentali nella progettazione delle tecnologie e dei servizi dell’Internet of Things (IoT). Tuttavia, la realtà è ben diversa: molti prodotti IoT presenti sul mercato sono caratterizzati da meccanismi di sicurezza inadeguati, incompleti o mal progettati. Spesso i produttori di questi dispositivi provengono da settori legati a sensori e attuatori a basso costo, come l'automazione domestica, il controllo dell’illuminazione o la videosorveglianza, dove inizialmente i dispositivi erano pensati per operare in ambienti isolati e quindi senza particolari minacce alla sicurezza.

A peggiorare la situazione, gli utenti raramente possiedono una formazione adeguata sulle pratiche di sicurezza informatica e spesso non adottano nemmeno le misure più basilari di protezione, come cambiare la password preinstallata nei dispositivi.


## Vulnerabilities of the Thing Layer
**Compromissione del nodo:** Un attaccante può sottrarre fisicamente un nodo dell’architettura IoT o sostituirlo con uno malevolo, compromettendo così l’intero sistema.

**Iniezione di codice malevolo:** Poiché gli aggiornamenti di firmware e software nei dispositivi IoT spesso avvengono via OTA (Over-The-Air), se la comunicazione non è cifrata, un attaccante può intercettare il flusso e iniettare codice dannoso o firmware modificato direttamente nella memoria del dispositivo.

**Attacco con iniezione di dati falsi:** Un nodo compromesso può essere utilizzato per introdurre dati errati nel sistema IoT, causando analisi distorte, risultati fuorvianti o il malfunzionamento delle applicazioni che si basano su quei dati.

**Intercettazione e interferenza:** Poiché i nodi IoT sono spesso installati in ambienti aperti, sono facilmente esposti all’intercettazione. Un attaccante può ascoltare le comunicazioni, catturare dati trasmessi o intercettare i processi di autenticazione.

**Attacchi di privazione del sonno (Sleep Deprivation):** Alcuni attacchi mirano a esaurire la batteria dei dispositivi IoT a basso consumo, forzandoli a restare attivi in modo continuo. Questo provoca l’esclusione dei nodi dal sistema e, di fatto, una negazione del servizio.

## Vulnerabilities of the Network Layer
==Attacchi DoS/DDoS:== L’attaccante sovraccarica i server con richieste indesiderate, bloccando i servizi per gli utenti legittimi. Gli attacchi DDoS sono particolarmente efficaci se l’attaccante controlla numerosi dispositivi IoT.

![[2Semester/ETH/Images/73.png|300]]

==Attacchi di routing:== Nodi malevoli manipolano i percorsi dei dati durante la trasmissione.
- _Sinkhole:_ il nodo attaccante finge di offrire il miglior percorso, attirando il traffico.
- _Wormhole:_ l’attaccante crea un collegamento nascosto tra due nodi per aggirare le misure di sicurezza.

![[2Semester/ETH/Images/74.png]]

## Vulnerabilities of the middleware and gateway layers
**Man-in-the-Middle (MitM):** Nei protocolli come MQTT (protocollo di messaggistica leggero), un attaccante che prende il controllo del broker può intercettare, manipolare o bloccare le comunicazioni tra client e sottoscrittori, senza che questi se ne accorgano.

![[2Semester/ETH/Images/75.png|400]]

**Crittografia end-to-end:**  
Per garantire la riservatezza, solo il destinatario deve poter decifrare i messaggi. Tuttavia, i gateway, durante la traduzione dei protocolli, devono decifrare e ricifrare i dati, rendendoli vulnerabili a possibili violazioni.

# Security measures/vulnerabilities/ attacks of popular IoT Protocols 8.1 Zigbee

## ZigBee recap
Il livello PHY e MAC sono tratti dallo standard IEEE 802.15.4.
  
Il **livello di rete (NWK)** si occupa di:
- **Instradamento** dei pacchetti nella rete (decidere il percorso che i dati devono seguire);
- **Sicurezza** (crittografia, autenticazione, ecc.);
- **Configurazione di nuovi dispositivi**

Tutte queste funzioni sono gestite dal **coordinatore della rete**, che ha anche il ruolo di **trust center**.

Il trust center è responsabile di
1) autenticare i dispositivi che richiedono di unirsi alla rete;
2) decidere se accettare o rifiutare la richiesta di adesione;
3) mantenere e distribuire le chiavi di rete;
4) abilitare la sicurezza end-to-end tra i dispositivi

![[2Semester/PND/images PND/196.png]]

## Cryptographic keys
ZigBee usa due tipi principali di chiavi a 128 bit per proteggere le comunicazioni:
- **Link Key:** Serve a proteggere le comunicazioni unicast (da un dispositivo a un altro) tra l’applicazione e il dispositivo.
- **Network Key:** Serve per le comunicazioni broadcast (inviate a tutti i dispositivi della rete) ed è condivisa tra tutti i dispositivi della stessa rete.

Inoltre, i produttori possono fornire chiavi specifiche per ogni dispositivo, chiamate **Master Keys**.

## Key acquisition
Ci sono vari modi per ottenere le chiavi necessarie:
- **Preinstallazione:** Le chiavi vengono caricate direttamente sul dispositivo durante la produzione.
- **Key Transport:** La chiave viene generata altrove (di solito dal Trust Center) e poi inviata al dispositivo, spesso senza cifratura, cioè trasmessa in chiaro via radio (Over-The-Air).
- **Key Establishment:** Viene usata la crittografia asimmetrica (coppie di chiavi pubblica/privata) per creare una chiave condivisa. Questo processo usa un protocollo basato su Elliptic Curve Diffie-Hellman, che consente a entrambi i dispositivi di calcolare indipendentemente la stessa chiave senza trasmetterla direttamente.

## ZigBee Network Key Sniffing Attack
attacco di sniffing per ottenere la chiave di rete ZigBee.
![[2Semester/PND/images PND/197.png]]

```ad-info
title: How it work
1. **Sniffing del traffico**: Un attaccante utilizza un dongle economico (es. CC2531) per intercettare i pacchetti ZigBee trasmessi tra i dispositivi (es. sensori e coordinatori).
    
2. **Analisi con software**: Usando tool come _SmartRF Packet Sniffer_ o _KillerBee_ (`zbdsniff`), estrae la chiave di rete dai dati catturati (es. da un file `.pcap`).
    
3. **Compromissione**: Una volta ottenuta la chiave (es. `0d:0c:0a:08:...`), l’attaccante può decifrare le comunicazioni, inviare comandi falsi o aggiungere dispositivi non autorizzati alla rete.

```


## Sinkhole attack
Il ==sinkhole attack== è un attacco comune nelle Wireless Sensor Networks. Un nodo compromesso diffonde informazioni false sulle proprie capacità di instradamento, fingendo di avere una rotta molto efficiente verso la Base Station. Di conseguenza, gli altri nodi instradano i pacchetti verso questo nodo malevolo, che può modificarli, eliminarli o inoltrarli al coordinatore, rendendo difficile rilevare l’attacco.

```ad-example
![[82k.png]]


```

ZigBee supporta due topologie di rete: **alberi gerarchici** e **mesh**.  
Negli ==alberi gerarchici== il **routing è fisso**, mentre nelle ==reti mesh ZigBee== usa un protocollo di routing **AODV pesato**, in cui il peso di un link $l$ è definito come:
$$C(l) = min(7, [\frac{1}{p^4_l}])$$
dove $p_l$ è la probabilità di consegna corretta dei pacchetti sul link $l$.  
Questa probabilità può essere stimata dagli sviluppatori.

```ad-example
![[83k.png]]

```


# Security measures/vulnerabilities/ attacks of popular IoT Protocols 8.2 BLE

==BLE== prevede ==due tipi di nodi==: **central** e **peripheral**.
-  I nodi **peripheral** trasmettono periodicamente degli **advertisements** (pubblicità) su canali dedicati.
- I nodi **central** ascoltano questi advertisements e si connettono ai dispositivi periferici di interesse.

BLE opera nella banda ISM unlicensed a 2.4 GHz, utilizzando **40 canali** con spaziatura di 2 MHz ciascuno:
- **3 canali** sono dedicati agli advertising.
- **37 canali** sono usati per il trasferimento dati.
 
Durante la comunicazione dati, BLE trasmette in **burst** per risparmiare energia:
- I dispositivi periferici possono rimanere a lungo in modalità **sleep**, svegliandosi solo a intervalli prestabiliti per ascoltare eventuali messaggi dal nodo centrale.
- La sincronizzazione tra central e peripheral avviene secondo uno schema **TDMA** (Time Division Multiple Access) con **frequency hopping** (FH).
    -  Questo significa che i dispositivi usano un singolo canale per volta, cambiando canale nel tempo secondo un ordine predefinito, per migliorare la robustezza delle comunicazioni e ridurre interferenze.

## BLE addresses
L’indirizzo MAC BLE **non è esposto direttamente**; viene invece pubblicizzato un indirizzo **random** che cambia frequentemente.
BLE può scegliere tra tre tipi di indirizzi random:
    1. **Random Static Address**
		- Generato una volta per ogni accensione (power cycle).
		- Rimane fisso durante la sessione di accensione, non può essere rigenerato in altri momenti.
    2. **Resolvable Private Address (RPA)**
        - Cambia a intervalli regolari.
        - Generato usando una chiave chiamata **Identity Resolving Key (IRK)** e un numero random.
        - Solo dispositivi “trusted” che conoscono l’IRK possono risolvere questo indirizzo e risalire alla vera identità del dispositivo.
    3. **Non-resolvable Private Address**
        - Indirizzo random che cambia periodicamente.
        - Nessun dispositivo può risolverlo per risalire all’identità reale.
        - Usato per garantire **anonimato totale**

## BLE encryption and authentication
Il processo di **Pairing** in **Bluetooth Low Energy (BLE)** serve per **stabilire una connessione sicura** tra due dispositivi, consentendo **cifratura e autenticazione** delle comunicazioni. Questo processo si basa sull’uso dell’**algoritmo AES a 128 bit** e si articola in **4 fasi principali**:
    1. **Feature exchange**
	    - Scambio non cifrato delle capacità di IO, requisiti di autenticazione, e proposta della lunghezza della chiave (7-16 byte).
    2. **Key establishment**
        - I dispositivi generano o scambiano una **Temporary Key (TK)** usando il metodo scelto.
		- La **TK** viene poi usata per calcolare una **Short Term Key (STK)** con cui cifrare temporaneamente la connessione.
    3. **Key distribution**
        - Usando la connessione cifrata con STK, i dispositivi si scambiano le **long-term keys (LTK)**, chiavi usate per derivare le sessioni future.
    4. **Bonding**
        - I dispositivi scambiano e memorizzano le LTK per poter riconnettersi in futuro senza rifare il pairing.

## Metodi di autenticazione nel Pairing
- **Just Works**:  
    Nessuna interazione utente. È semplice ma **meno sicuro**.
- **Numeric Comparison**:  
    Entrambi i dispositivi mostrano un numero. L’utente **conferma che i numeri corrispondano**.
- **Passkey Entry**:  
    Un dispositivo genera una **passkey** che l’utente inserisce nell’altro.  
    Poi:
    - Entrambi generano **nonce** e **commitment** del nonce locale e delle chiavi pubbliche.
    - Si scambiano i dati e li **verificano**.
    - Se coincidono, la passkey è corretta → si genera la STK.


## Network traffic sniffing - fitness tracking case study 
Durante uno studio in palestra sono stati catturati oltre 7,5 milioni di pacchetti BLE in 8 giorni.   I fitness tracker (server) trasmettono frequentemente pacchetti di advertising, mentre i dispositivi client (smartphone iOS e Android) lo fanno raramente e cambiano spesso indirizzo per proteggere la privacy.

### Perché i fitness tracker pubblicizzano così spesso?
Devono essere sempre pronti a connettersi agli smartphone, inviando advertising continui per farsi trovare rapidamente.  Hanno batterie più grandi o sono progettati per trasmettere costantemente, quindi il risparmio energetico è meno prioritario. Usano spesso indirizzi statici o che non cambiano, esponendo la loro identità e facilitando il tracking.

I client si disconnettono spesso per risparmiare energia. Il fitness tracker comunica attivamente solo quando l’app dello smartphone è aperta, per sincronizzare i dati. Quando l’app è chiusa, il tracker resta in stato di advertising. Questo comportamento è stato osservato in tutti i tracker studiati.

Anche se i dispositivi BLE possono cambiare indirizzo per aumentare la privacy, nessuno dei tracker lo fa. Usano prevalentemente indirizzi statici o risolvibili che non cambiano nemmeno dopo la scarica completa della batteria, rendendo facile il tracciamento.


### Vulnerabilità e rischi
Un attaccante può intercettare il traffico BLE e tracciare gli utenti in luoghi pubblici.

==Rilevamento attività:== la quantità di traffico BLE tra tracker e smartphone varia in base all’intensità del movimento dell’utente.

![[256k.png]]

==Identificazione persone:== i dati BLE mostrano pattern diversi in base all’attività rilevata dagli accelerometri dei tracker (passi, calorie, distanza, scale). Questi pattern possono identificare persone diverse mentre camminano.

![[257k.png|400]]


## KNOB (Key negotiation of Bluethoot) Attack
 **Vulnerabilità sfruttata:** lo scambio delle funzionalità (feature exchange) durante il pairing BLE non è cifrato.

Un attaccante può eseguire un **attacco Man-in-the-Middle (MitM)** per ridurre la lunghezza della chiave di cifratura (Long Term Key, LTK) e della chiave di sessione a soli **7 byte** (56 bit), invece dei normali 16 byte (128 bit).

```ad-info
title: How it Work?
- L’attaccante (Charlie) si inserisce tra Alice e Bob che stanno comunicando via BLE.
    
- Charlie intercetta e rilancia i messaggi tra i due, facendoli credere di parlare direttamente tra loro.
    
- Durante questo, manipola la negoziazione della chiave per forzare l’uso di una chiave più debole.
    
- In wireless, può anche usare segnali di disturbo per impedire che Alice e Bob si sentano direttamente, costringendoli a passare per lui.

```


![[92k.png]]

# Security measures/vulnerabilities/ attacks of popular IoT Protocols 8.2 LoRaWAN

## Eavesdropping LoRa
Gli attacchi di intercettazione avvengono quando un hacker **intercetta, modifica o cancella** i dati trasmessi tra due dispositivi.

## Crittografia in LoRa
- LoRa usa **AES in modalità CTR** (Counter Mode) per cifrare i dati.
	![[260k.png]]
- La chiave usata è **AppSKey**, condivisa tra dispositivo e server.
- Il **contatore** usato è il **frame counter** del protocollo LoRa, che però **si resetta a 0** dopo ogni sessione.
  
```ad-missing
title: Problem

In AES-CTR, usare lo **stesso key stream** (cioè la stessa chiave + contatore) per cifrare più messaggi è pericoloso.
$$\text{C1} \oplus \text{C2} = \text{P1} \oplus \text{P2}$$


(XOR tra i due testi cifrati è uguale allo XOR dei testi in chiaro)



```

>Poiché LoRa utilizza AppSKey come chiave, il contatore deve essere sempre diverso per ottenere una chiave di flusso diversa. ma non è questo il caso dato che lo stesso flusso di chiavi viene utilizzato più volte.

## Perché è pericoloso?
Lo XOR del testo in chiaro non rivela comunque i messaggi originali.
Tuttavia, un aggressore può conoscere o indovinare parte del testo in chiaro.