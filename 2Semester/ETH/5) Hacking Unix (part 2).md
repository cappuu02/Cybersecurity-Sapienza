# 5 – Hacking Unix 2

---
## Local Access → Privilege Escalation

Quando un attaccante ottiene una shell locale punta a diventare **root**:

- **Attacco diretto** (Weak passwords, symlink, kernel bugs, SUID binaries)
- **Sfruttamento di misconfigurazioni** (file/directory permissions, SUID inutili)

Una volta root, può installare **Trojan, rootkit** o **log‑cleaner** per restare invisibile.

---
### Weak Passwords

Gli utenti scelgono credenziali facili: anche _P@ssword1_ resiste meno di 10 s a un dizionario.

- **Dove risiedono**
    - `/etc/passwd` → username, UID/GID, home, shell; la password è solo un placeholder
    - `/etc/shadow` → hash MCF `$id$salt$hash` più regole di scadenza

- **Come si spezzano**  
    `John the Ripper` riconosce l’MCF e applica mangling: 
    `john --wordlist=<dictionary> hashes.txt`

- **Contromisure**
    - Passphrase lunghe e non banali (niente ripetizioni o date di nascita)
    - Limitare i tentativi di login e forzare il cambio periodico
    - Formare gli utenti: la tecnologia da sola non basta
---

### Symlink

Un link simbolico può far puntare un file temporaneo a `/etc/shadow`; se un processo privilegiato ci scrive, l’attaccante vince.

- **Difesa** `open()` con `O_EXCL|O_CREAT`, directory temporanee non world‑writable, mount `noexec,nodev,nosuid`

---

### Race Condition & Signal Handling

Programmi che alzano i privilegi per pochi millisecondi sono vulnerabili: inviando un **signal** nel momento giusto l’attaccante “vince la gara”.

- **Mitigazione** sezioni critiche protette, gestori di segnale minimali, aggiornamenti costanti

---
### Core Dump esposti

Un crash genera un file con l’intera memoria del processo (hash, chiavi, cookie). Se finisce in una cartella web leggibile, è un regalo per l’attaccante.

- **Rimedi** `ulimit -c 0` in produzione o directory protette da ACL

---
### Shared Library Hijacking

Manipolare la ricerca delle `.so` (variabili `LD_*`, rpath, `/usr/lib`) consente di eseguire codice arbitrario da parte di più programmi.

- **Buone pratiche** rpath fissi verso percorsi sicuri, directory non scrivibili, audit di `LD_LIBRARY_PATH`

---
## Kernel Flaws

Il kernel gestisce permessi, segnali, passaggio di privilegi: un kernel exploit consegna l’intero sistema all’attaccante.

- Aggiornare subito alle security patches e abilitare hardening (grsecurity, SELinux, AppArmor)

---
## Unix Permissions

Tre classi (user, group, others) × tre modalità (r, w, x); i bit speciali SUID, SGID e sticky sono quelli critici.

---
### SUID / SGID – Elevazione temporanea

- **Funzionamento** Un file con bit SUID parte con l’EUID del proprietario; un binario root‑SUID diventa root.
- **Rischi** Molti SUID scrivono file temporanei in `/tmp` (world‑writable con sticky‑bit); un symlink o un buffer overflow equivale a esecuzione privilegiata.
- **Mitigazioni**
    1. Inventario periodico (`find / -perm -4000`) e rimozione dei SUID non indispensabili
    2. Mount `nosuid` su filesystem dove non serve (USB, /home, /tmp separato)
    3. Secure coding: `O_EXCL|O_CREAT`, directory temporanee private

---
### World‑Writable Files

File modificabili da chiunque diventano vettori di hijack (startup script, cron, librerie).
- Verifica: `find / -not -type l -perm -o+w …`
- Regola: evitarli salvo reale necessità e togliere il bit `w` appena possibile

---
## APT – Advanced Persistent Threats

### Trojans
Un file apparentemente legittimo (`ssh`, `login`) può raccogliere credenziali o aprire backdoor.
- Rilevazione affidabile solo con hash di riferimento firmati; timestamp e dimensioni sono falsificabili.

### Sniffers
Intercettano traffico sulla stessa LAN (wifi ancora peggio) restando passivi.
- Limitare la superficie con switch, monitor promiscuous‑mode, e crittografare (TLS, IPsec).

### Log‑Cleaner
Rootkit che elimina `bash_history`, `auth.log`, record `sudo` o intercetta i demoni di log via `ptrace`.
- Difesa: logging remoto in append‑only, controllo di integrità, canali di audit segregati.

### Kernel Rootkits
- **Meccanismo** Modificano system‑call table, IDT o scrivono in `%cr0` via `/dev/mem`.
- **Contromisure** secure boot, moduli firmati, kernel lockdown; se già compromesso, reinstallare da fonti attendibili.

---

Sicurezza locale significa kernel patchato, permessi corretti, SUID ridotti, file non world‑writable e logging protetto. Se un solo anello cede, un attaccante con shell locale può salire a root e installare Trojan, sniffers o rootkit difficili da estirpare.