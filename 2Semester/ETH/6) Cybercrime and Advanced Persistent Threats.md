# Cybercrime and Advanced Persistent Threats

## Cosa sono gli APT (Advanced Persistent Threat)
Un ==Advanced Persistent Threat (APT)== è una **categoria di minacce informatiche** che si distingue per il suo approccio metodico, mirato e duraturo. Gli APT sono considerati tra gli attacchi **più pericolosi** perché combinano sofisticazione tecniche con una pianificazione strategica a lungo termine.

### Caratteristiche fondamentali:
- **Advanced**: gli attori APT fanno uso di strumenti avanzati come exploit zero-day, malware su misura, tecniche di evasione anti-forensics e metodologie complesse per accedere e restare nei sistemi.
- **Persistent**: l’obiettivo non è causare danni immediati o visibili, ma mantenere l’accesso all’infrastruttura della vittima per settimane, mesi o anni, estraendo dati o manipolando sistemi senza destare sospetti.
- **Threat**: il soggetto dietro un APT è organizzato, finanziato e motivato. Spesso si tratta di attori statali, gruppi criminali ben strutturati o contractor al servizio di governi.


### Obiettivi degli APT
Gli APT non sono interessati a guadagni rapidi o a vandalismo informatico, ma piuttosto alla **sottrazione metodica e continua di dati sensibili**. L’accesso viene mantenuto per ottenere:

- Proprietà intellettuale
- Segreti aziendali o di stato
- Informazioni finanziarie
- Dati personali (PII) o credenziali

>La finalità può essere il vantaggio competitivo, l’influenza geopolitica o il profitto economico a lungo termine.



### Differenze tra APT e attacchi opportunistici

|Caratteristica|APT|Attacchi Opportunistici|
|---|---|---|
|Obiettivo|Specifico e strategico|Opportunistico|
|Durata|Lunga (mesi/anni)|Breve (minuti/ore)|
|Sofisticazione|Alta|Bassa o media|
|Visibilità|Invisibile o discreta|Spesso visibile|
|Tecniche|Personalizzate|Strumenti pubblici|
|Attori|Organizzati, statali o APT|Script kiddie, bot automatici|

### Tipologie di APT
Gli APT si dividono in due grandi categorie:

- ==APT di natura criminale==: mirano al furto di Personally Identifiable Information, numeri di carte di credito, credenziali bancarie o documenti riservati da rivendere o usare per frodi.
- ==APT per spionaggio==: sponsorizzati da stati o grandi corporazioni, cercano di ottenere proprietà intellettuale, tecnologie avanzate o informazioni strategiche per fini geopolitici o economici.

## Modalità e tecniche di attacco
La fase iniziale di un attacco APT è spesso caratterizzata da **spear phishing**: un’e-mail personalizzata e credibile indirizzata a un utente specifico. Il contenuto induce la vittima a cliccare su un link o aprire un allegato infetto.

### Tecniche principali:
- **Cut-outs**: uso di altri host compromessi per nascondere l’origine del traffico.
- **Dropper delivery**: utilizzo di malware acquistato o affittato (malware-as-a-service).
- **SQL injection**: per compromettere siti e installare codice malevolo.
- **Ingegneria sociale**: impersonificazione di tecnici, IT helpdesk, colleghi, ecc.
- **Insider compromessi**: anche se rari, sono una risorsa molto efficace.
- **Hardware infetto**: ad es. chiavette USB lasciate deliberatamente nei parcheggi aziendali.

## Fasi tipiche di un APT
Il ciclo di vita di un APT segue un modello strutturato in più fasi:

1. **Targeting**  
    Raccolta di informazioni sul target: strutture aziendali, indirizzi e-mail, vulnerabilità note, figure chiave.
2. **Accesso (Initial Compromise)**  
    Ingresso nel sistema tramite phishing, vulnerabilità software o login deboli.
3. **Ricognizione interna (Internal Reconnaissance)**  
    Identificazione di altre macchine, server di dominio, risorse condivise, account privilegiati.
4. **Movimento laterale (Lateral Movement)**  
    Espansione all’interno della rete aziendale usando tecniche come pass-the-hash, reimpersonificazione o exploit locali.
5. **Esfiltrazione dei dati**  
    Estrazione di file verso server controllati dall’attaccante, spesso con tecniche di offuscamento (es. file ZIP rinominati in .gif).
6. **Mantenimento dell’accesso**  
    Installazione di backdoor persistenti, manipolazione di servizi, modifiche al sistema per evitare il rilevamento.

## Rilevamento e tracciamento
Gli indicatori di un APT sono spesso **sottili** e **indiretti**, e richiedono il monitoraggio di una molteplicità di log e sistemi.

### Possibili segnali:
- Accessi a orari inconsueti o da località insolite
- E-mail con link sospetti
- Tracce nei firewall, nei log dei server web, nei sistemi IDS/IPS
- Attività inusuali nei software aziendali (es. movimenti di file o download anomali)


## Indagini forensi
La risposta a un APT richiede strumenti e competenze di digital forensics. I principali artefatti cercati includono:

- Dump di memoria RAM (per trovare malware in esecuzione)
- File di swap e ibernazione
- Log di eventi (System, Security, Application)
- Chiavi di registro (Run, RunOnce)
- File modificati in `System32` o directory di sistema
- File compressi e rinominati (es. `.rar` → `.gif`)
- DNS cache e connessioni sospette a server esterni


# Campagne APT Storiche
Le APT non sono un concetto recente: dagli anni 2000 si registrano numerose campagne complesse, condotte con obiettivi di spionaggio industriale, sabotaggio, furto di dati e controllo delle infrastrutture. Di seguito, le più significative analizzate nel capitolo.

## Operation Aurora (2009)
Una delle prime APT pubblicamente riconosciute. Colpì aziende americane del settore tecnologico e difensivo, tra cui:

- Google
- Juniper Networks
- Adobe
- Altre 29 aziende

### Tecnica d'attacco:
- Inviata una e-mail contenente un link a un sito taiwanese compromesso
- Il sito eseguiva JavaScript malevolo che sfruttava una vulnerabilità di **Internet Explorer**
- L’attacco non veniva rilevato dagli antivirus dell’epoca

Dopo l’esecuzione:
- Veniva installato un **Trojan Downloader**
- Il Trojan scaricava e avviava una **RAT (Remote Access Trojan)**
- Le comunicazioni con il C&C avvenivano su canali **SSL cifrati**

### Attività post-infezione:
- Reconnaissance della rete
- Compromissione di **Active Directory**
- Accesso a condivisioni e file contenenti proprietà intellettuale
- Furto continuo di documenti per mesi

### Origine:
Le analisi hanno ricondotto i server C&C a **due scuole cinesi**. Google ha pubblicamente accusato la Cina, ma **non è mai emersa una prova formale** di coinvolgimento statale.


## Altri attacchi storici

### Night Dragon (2010)
Colpì multinazionali del settore energia e petrolio. Le tecniche includevano:
- Spear phishing
- Accesso remoto via VPN
- Furto di informazioni sulle operazioni e risorse energetiche

### RSA Breach (2011)
Attacco contro RSA Security, mirato al furto delle chiavi di autenticazione dei token **SecurID**, usati da migliaia di organizzazioni per la **2FA**. Questo attacco creò le basi per APT secondarie contro clienti RSA.

### Shady RAT
Campagna lunga anni, con bersagli in più paesi. I C&C erano distribuiti globalmente e l’attacco puntava a enti pubblici, media, ONG e aziende private.

### Lurid, Nitro, Stuxnet, DuQu
- **Stuxnet**: malware progettato per sabotare centrifughe iraniane
- **DuQu**: simile a Stuxnet, ma focalizzato sull’esfiltrazione di dati
- **Nitro**: colpì aziende chimiche per sottrarre brevetti
- **Lurid**: controllava centinaia di host compromessi tramite comandi remoti

# Anonymous
**Anonymous** è un gruppo di hacktivisti senza una struttura centralizzata. Non agisce per profitto ma per motivi ideologici o politici, e si affida a tecniche APT-like ma con obiettivi pubblici e dimostrativi.

### Tecniche impiegate:
- SQL Injection e XSS
- Sfruttamento di vulnerabilità in web services
- Spear phishing e social engineering
    - Ad es. impersonificando personale helpdesk

### Obiettivi principali:
- Agenzie governative (tutti i livelli)
- Aziende private: Sony, BART (Bay Area Rapid Transit), Mastercard, Visa
- Campagne di disturbo tramite DoS/DDoS e data leak


# RBN – Russian Business Network
La **Russian Business Network (RBN)** è una delle organizzazioni criminali digitali più note e longeve, attiva dagli anni 2000 e originaria di San Pietroburgo.

### Attività principali:
- Gestione di **botnet** utilizzate per spam, phishing e distribuzione malware
- Furto di identità e truffe bancarie
- Hosting di contenuti pornografici a pagamento
- Vendita o affitto di infrastrutture malevole a criminali terzi

RBN è riconosciuta per l’uso di malware molto sofisticati e persistenti, e rappresenta un caso emblematico di **cybercrime-as-a-service**.

# GhostNet e Gh0st RAT
La campagna **GhostNet** (2008–2010) è stata una delle prime APT globali documentate in dettaglio. Colpì:

- Il governo tibetano in esilio
- Ambasciate
- Organizzazioni non governative

### Fase iniziale:
- Email di phishing contenenti link a siti compromessi
- Al click, veniva scaricata una backdoor: **Gh0st RAT**

### Caratteristiche della backdoor:
- Comunicazione cifrata con server C&C (infrastruttura utilizzata dagli attaccanti per comunicare con i sistemi compromessi e controllarli da remoto. )
- Capacità di:
    - Catturare screenshot
    - Attivare microfono e webcam
    - Esfiltrare file in batch zippati
- Persistenza tramite modifiche a:
    - `System32`
    - Registro di sistema (`Run`)
    - Creazione di servizi e task pianificati

Venne anche utilizzato **Netcat** per installare una seconda backdoor. L’attacco prevedeva la creazione di account di sistema e FTP per esportare i dati. Inoltre, i log venivano cancellati ogni giorno tramite uno script schedulato.

# Analisi Forense e Raccolta Artefatti
## Ordine di volatilità
Durante un'indagine forense è fondamentale rispettare l’**ordine di volatilità**, ovvero raccogliere per primi i dati più effimeri (che rischiano di scomparire rapidamente).

1. **Memoria RAM** – Contiene processi in esecuzione, shell attive, malware in memoria.
2. **Pagefile / Swapfile** – La memoria virtuale può contenere dati sensibili non presenti altrove.
3. **Processi attivi** – Informazioni su PID, eseguibili, connessioni attive.
4. **Connessioni di rete** – Porte aperte, IP remoti, tunnel SSL o Tor attivi.
5. **Registro di sistema (Windows)** – Chiavi di Run/RunOnce, configurazioni persistenti.
6. **File di log** – Eventi di sistema e sicurezza, accessi falliti, attività sospette.
7. **Immagine disco** – Intero contenuto del disco, incluso spazio non allocato.
8. **Backup** – Riferimenti temporali, cronologia dei file, shadow copy.


## Strumenti forensi consigliati
L’analisi deve essere condotta con tool che non alterino il contenuto del sistema e permettano la conservazione delle prove.

### Tool principali (da usare da CD o USB readonly):
- **FTK Imager** – Per il dump della memoria e la creazione di immagini forensi.
- **Sysinternals Autoruns** – Mostra programmi che si avviano automaticamente (Run, Task Scheduler).
- **Sysinternals Process Explorer** – Visualizza gerarchia dei processi, DLL collegate e PID.
- **Sysinternals Process Monitor** – Permette di osservare interazioni tra processi e sistema operativo in tempo reale.
- **CurrPorts** – Elenca le porte attive, IP remoti e DLL associate.
- **VMMap** – Mappa la memoria virtuale e fisica dei processi (utile per malware injection).
- **WinMerge** – Confronta directory e file (utile per rilevare modifiche in System32).
- **Volatility Framework** – Analisi della memoria in formato open-source.


## Analisi della Memoria
L’analisi della RAM è fondamentale perché consente di individuare malware in esecuzione, shell attive e codice iniettato, spesso non visibile nei file su disco.

### Tecniche:
- Dump RAM con FTK Imager o strumenti dedicati (Memoryze, Belkasoft, Magnet, ecc.)
- Analisi con **Volatility**, utile per estrarre:
    - Processi e thread
    - DLL caricate
    - Connessioni di rete (plugin `netscan`)
    - Credenziali in chiaro
    - Tracce di shell e comandi


## Analisi del file di swap e ibernazione
- File **`pagefile.sys`** e **`hiberfil.sys`** contengono porzioni di RAM paginata.
- Possono rivelare dati altrimenti non presenti: password, shell, contenuti della clipboard.
- Anche qui si può applicare **Volatility** o tool come **Mandiant Memoryze**.

# Tecniche di File e Process Capture
La raccolta dei file e delle informazioni di processo è essenziale per la correlazione e l’attribuzione dell’attacco.

## Informazioni da raccogliere:
- **Master File Table (MFT)** – Fornisce nome, dimensione e timestamp dei file (può rivelare malware creati recentemente).
- **Netstat / CurrPorts** – Connessioni attive, listening socket, PID, DLL.
- **DNS Cache** – Per identificare domini di C&C già contattati.
- **Registro di sistema** – Specialmente chiavi Run, servizi sospetti, Task Scheduler.
## Strumenti avanzati:
- **Process Monitor (ProcMon)** – Traccia l’interazione di ogni processo con file, registro e rete.
- **Process Explorer (ProcExp)** – Esamina l’albero dei processi, command-line, PID genitore.
- **CurrPorts** – Utile per rilevare backdoor attive in ascolto.
- **VMMap** – Può mostrare DLL anomale iniettate nella memoria di un processo.
- **reg query** – Comando per interrogare chiavi di registro sospette:

```shell
reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Run
```
## Altri elementi chiave da analizzare:
- **Scheduled Tasks** (`at`, `schtasks`) – Malware può programmare azioni periodiche.
- **Event Logs** (`psloglist`) – Log di accessi, errori, comandi eseguiti.
- **Prefetch Directory** – Traccia dei 128 programmi più recentemente eseguiti.
- **File utente**:
    - `ntuser.dat` → configurazioni del profilo
    - `index.dat` → cronologia browser
    - `.rdp` → connessioni remote
    - `.bmc` → immagini bitmap di sessioni
    - Log antivirus → esclusioni sospette (es. `nc.exe`)

# Attacchi APT su Linux
Gli attacchi APT non si limitano ai sistemi Windows. Anche Linux può essere compromesso con tecniche simili, spesso sfruttando configurazioni errate o credenziali deboli.

## Scenario tipico
Un caso emblematico è l’utilizzo di un **Apache Tomcat** con credenziali di default (es. admin:admin), lasciate accidentalmente attive in un ambiente di produzione.

### Fasi dell’attacco:
1. L’attaccante effettua uno **scan** per trovare un host Tomcat vulnerabile.
2. Usa uno script (o **Metasploit**) per autenticarsi.
3. Viene caricato un **file JSP malevolo** che apre una shell.
4. L’attaccante esplora `/etc/passwd` per scoprire altri utenti.

## Escalation dei privilegi
Una volta ottenuto l’accesso utente, l’attaccante può:
- Trovare password deboli (spesso basate sul nome dell’utente)
- Effettuare attacchi di brute-force
- Caricare una **shell SUID root** per accedere nuovamente in caso di revoca dell’accesso

La shell può essere mantenuta su disco o eseguita in memoria per evitare tracciamenti.

## Persistenza ed evasione
Per evitare detection:
- Si caricano **backdoor in PHP**
- Si sfrutta la RAM per scrivere shell o script temporanei
- Si utilizza **Meterpreter** in memoria per evitare scrittura su disco

## Diagnosi e contromisure
Una volta individuato l’host sospetto, è fondamentale:
- **Bloccare l’accesso** alla macchina via firewall
- Analizzare la cronologia comandi (`~/.bash_history`)
- Verificare i log di `sudo`, `su -`, `auth.log`, ecc.
- Identificare file nascosti in:
    - `/dev`
    - `/tmp`, `/var/tmp`
    - directory con nomi ingannevoli (es. `..` con spazio)
    - RAM disk (`/dev/shm`)

## Bash History
La shell bash salva per default 2000 comandi nella cronologia. Il file `.bash_history` è contenuto nella home dell’utente. Le dimensioni della cronologia sono controllate dai parametri:

```shell
HISTSIZE=2000 HISTFILESIZE=2000
```

## Upload malevoli via Tomcat
Tomcat permette l’invio di richieste `PUT`. Questo metodo può essere abusato per caricare file JSP o webshell.

Il file di log `localhost_access_log.*.txt` registra i dettagli del caricamento e può essere usato come prova dell’attacco.

## Verifica delle connessioni di rete
Comandi fondamentali per identificare eventuali connessioni malevole o tunnel attivi:

```shell
netstat -anlp lsof -i -P
```

>se il sistema è stato infettato con un rootkit, questi comandi potrebbero non mostrare i processi o le connessioni realmente attive.

## File nascosti e RAM drives
Gli attaccanti spesso montano **filesystem temporanei in RAM** per scrivere payload volatili (scompaiono al reboot).

### Comandi utili:
```shell
# Creazione RAM drive:
mkdir -p /tmp/ram sudo mount -t ramfs -o size=512M ramfs /tmp/ram  
# Visualizzazione:
df -a
```


# Analisi di File Sospetti

## Montare un file system
Per ispezionare una partizione sospetta o immagine disco:

```shell
sudo mount -t tipo /dev/sdXN /mnt/cartella
```

## Estrazione di stringhe leggibili
Spesso i malware sono binari compressi o cifrati. È utile estrarre stringhe ASCII leggibili:

```shell
strings malware.exe > malfile nano malfile
```

Questo può rivelare comandi, URL di C&C, nomi di file eseguibili e parametri.


# Esempi di Malware e Servizi

## Poison Ivy
==Poison Ivy== è un RAT (Remote Administration Tool) utilizzato in campagne APT, con funzionalità come keylogging, cattura schermo, controllo del file system, shell remota e comunicazione cifrata con C&C. È stato impiegato in attacchi famosi come **Operation Aurora (2009)**, **l'attacco a RSA (2011)** e la **campagna Nitro (2011)**.

## TDSS / TDL Botnet
==TDSS== (o TDL1-4) è una botnet avanzata che ha infettato oltre 5 milioni di host. Tra le sue caratteristiche principali:

- Utilizzo di **rootkit** (modifica il boot loader)
- Crittografia del traffico e dei file
- Server C&C ridondanti
- Tecniche di **anti-forensics**

È stato tra i primi esempi di **Malware-as-a-Service**, venduto per attacchi DDoS, click fraud e distribuzione di altri malware. Le sue varianti includono **ZeroAccess** e **Purple Haze**.