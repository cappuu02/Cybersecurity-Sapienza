
# 📞 Evoluzione delle Reti Cellulari

---

## ☎️ Prima delle Reti Cellulari

Le comunicazioni avvenivano esclusivamente tramite **linee telefoniche fisse**.  
Inizialmente, le chiamate venivano **instradate manualmente** da operatori umani con **centrali a commutazione manuale**.

> 🧠 Con l’introduzione degli **scambi elettromeccanici**, la selezione del numero attivava fisicamente il collegamento con il destinatario.  
> Oggi, tutto è gestito da **commutazione digitale**: i segnali sono instradati da sistemi digitali.

---

## 📡 Generazioni delle Reti Cellulari

### 🔊 1G – Prima Generazione (1979)

- **Comunicazione analogica pura**
    
- Nessuna cifratura, **qualità audio scarsa**
    
- **Copertura e capacità molto limitate**
    

### 📱 2G – Seconda Generazione (1990)

- Introduzione della **modulazione digitale**
    
- Basata su **GSM**, standard europeo unificato
    
- Supporto per **SMS** oltre alle chiamate vocali
    

### 🌐 3G – Terza Generazione (2000)

- Connessione anche alla **rete Internet pubblica**
    
- Aumento notevole del **data rate**
    
- Inizio della diffusione massiva dei **dispositivi mobili connessi**
    

---

# 🧱 Concetto di Rete Cellulare

## 🗺️ Dalla linea unica alla suddivisione in celle

Le vecchie reti usavano **pochi trasmettitori potenti** per grandi aree → **poca scalabilità**.  
Il concetto cellulare divide il territorio in **celle**, ognuna servita da una **base station** a bassa potenza.

> ✅ Ogni cella usa un gruppo di canali  
> 🚫 Le celle vicine non condividono frequenze → meno interferenze

---

## 🧩 Celle e Griglie

- Le celle sono **aree geografiche** servite da una BS
    
- Rappresentate come **esagoni** per comodità teorica (honeycomb grid)
    

> ℹ️ In realtà, la copertura è irregolare con aree scoperte e sovrapposizioni  
> Ma il modello a esagoni è lo **standard di riferimento**

![[Pasted image 20250521155950.png|500]]

---

## 🔁 Frequency Reuse

La tecnica di **frequency reuse** assegna **gli stessi canali** a celle **sufficientemente distanti**.

- Le celle sono organizzate in **cluster**
    
- Ogni cluster usa tutte le frequenze disponibili una sola volta
    
- La distanza di riutilizzo $D$ è data da:
    
    $D=3N⋅rD = \sqrt{3N} \cdot rD=3N​⋅r$
    
    Dove $N$ è la dimensione del cluster, $r$ è il raggio della cella
    

> 🔁 Più grande è $N$, **più alta la capacità** ma anche le interferenze  
> Ideale per ambienti urbani densi

![[Pasted image 20250521160029.png|500]]![[Pasted image 20250521160103.png|500]]![[Pasted image 20250521160132.png|500]]


---

## 📡 Cell Sectoring e Splitting

### 📶 Cell Sectoring

- Ogni cella è **divisa in 3 settori** da **antenne direzionali**
    
- Ogni settore usa una porzione della frequenza
    
- Riduce le interferenze e aumenta la riusabilità
    

### ✂️ Cell Splitting

- Le celle possono essere suddivise in **celle più piccole** per aumentare il **throughput** in zone ad alta densità
    
- Le piccole celle possono essere **attivate o disattivate dinamicamente**
    

---

# 📶 4G LTE – Architettura Moderna

## 🏗️ Fondamenti di LTE

- Interamente **IP-based** (anche per la voce: VoIP/VoLTE)
    
- Utilizza **OFDMA** + **MIMO**
    
- Supporta applicazioni **IoT** e **alta velocità**
    
- Supporto a **Low Power Wide Area (LPWA)**
    

---

## 📱 Dispositivi Mobili

- Ogni device ha un **IP** e un **IMSI** a 64 bit (memorizzato nella SIM)
    
- La SIM contiene info sull’**operatore** e i **servizi abilitati**
    

---

## 🗼 Base Station (BS)

- Antenne che **coprono l’area cellulare**
    
- Gestiscono le risorse radio e **instradano i dati**
    
- Sono collegate tra loro tramite **rete cablata**
    

---

## 🗃️ HSS – Home Subscriber Server

- Database degli utenti registrati in una rete
    
- Usato con il **MME** per autenticazione e gestione mobilità
    

---

## 🌐 Gateway e Routing

- **S-GW (Serving Gateway)**: inoltra i pacchetti dell’utente
    
- **P-GW (Packet Gateway)**: assegna l’IP e collega a Internet
    

---

## 🔐 MME – Mobility Management Entity

- Gestisce l’**autenticazione** del device
    
- Contatta l’HSS per confermare l’IMSI
    
- In caso di successo:
    
    - Invia conferma crittografata al dispositivo
        
    - Crea i tunnel per i dati
        
    - Tiene traccia della **posizione della cella**
        
![[Pasted image 20250521160354.png|500]]![[Pasted image 20250521160414.png|500]]

---

## 📦 LTE Protocol Stack

Supporta l’intero **stack TCP/IP**.  
Le operazioni principali avvengono nel **Device Link Layer**:

![[Pasted image 20250521160432.png|500]]
### 1. **PDCP** – Packet Data Convergence

- Compressione header IP
    
- Cifratura/decifratura
    

### 2. **RLC** – Radio Link Control

- Frammentazione/ricostruzione
    
- Trasferimento affidabile
    

### 3. **MAC**

- Pianificazione slot
    
- Correzione errori
    

---

## 📡 LTE Radio Access

- LTE usa **OFDM** con slot da **0.5 ms**
    
- Gli slot sono riassegnabili ogni **millisecondo**
    
- Gli operatori definiscono gli **algoritmi di scheduling**

![[Pasted image 20250521160517.png|500]]

---

## 🌍 Network Attachment

Fasi per collegarsi alla rete cellulare:

1. **Ricerca e associazione** a una BS
    
2. **Autenticazione reciproca**
    
3. **Configurazione del tunnel dati** verso il PDN Gateway
    

---

## 🛣️ Tunnelling

> 🎯 Il tunnelling incapsula pacchetti IP per garantire **IP stabile e connettività continua**  
> Utilizzato in **VPN**, **IPv6** e nelle **reti cellulari (es. GTP-U in 4G)**

---

## 🔁 Handover

Processo per passare da una BS a un’altra:

![[Pasted image 20250521160539.png|500]]

1. Misura del segnale e carico
    
2. Scelta della BS target
    
3. Invio richiesta e preallocazione risorse
    
4. Inoltro pacchetti alla nuova BS
    
5. MME aggiorna tunnel
    
6. Inizio trasmissione tramite la nuova BS
    

> 📶 Permette la **mobilità continua** senza perdita di connessione

---

# 📡 NB-IoT – Narrowband IoT

**NB-IoT** è una tecnologia cellulare pensata per l’**Internet of Things**, che utilizza **banda stretta** per:

- Migliore **penetrazione** del segnale
    
- Maggiore **efficienza energetica**
    
- Supporto per **fino a 50.000 dispositivi per cella**
    

> ✅ Ideale per dispositivi che inviano **piccoli pacchetti di dati occasionali**

![[Pasted image 20250521160602.png|500]]

---

## ⚙️ Caratteristiche Tecniche

- Basato su **LTE**, ma con banda di appena **180 kHz**
    
- Richiede **SIM specifiche per NB-IoT**
    
- Moduli **economici**, bassa velocità, lunga durata
    

---

## 📡 Modalità di Deploy

1. **In-Band**: usa uno dei **PRB** (Physical Resource Block) dell’LTE
    
2. **Guard-Band**: sfrutta le bande protette laterali di LTE
    
3. **Standalone**: spettro dedicato, non condiviso
    

> 🧱 Perfetto per sensori in ambienti chiusi (es. scantinati)

___
