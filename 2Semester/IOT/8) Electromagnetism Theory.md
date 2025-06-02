  In IoT networks, smart devices collect data and work together to accomplish a common objective.
Smart things form the perception layer of an IoT architecture.
These devices have very limited computation capacities and are scattered around possibly large areas. For these reasons, they must be able to communicate their data (raw or processed).

# Electromagnetism Theory
**Photon**: the smallest amount of energy that can be transported (quantum of energy). Has no mass, cannot be split, but only created or destroyed.
**Electromagnetic radiation**: electromagnetic waves that carry energy distributed as “energy packets”, i.e., photons.
Energy that can be transported by a photon $E=hf$: , where $h$ is the Planck constant (very small, $\sim10^{-34}$) and $f$ is the frequency of the wave

![[9c.png]]
>Important is the concept of period of a function (wave)

For each wave we can know the amount of frequency and wavelength.
Large wavelength = small frequency
High frequency = Small wavelength

## Where does the energy for electromagnetic waves come from?
A vast range of electromagnetic waves are created when atoms or molecules drop from a higher state of energy to a lower one: in this way, they lose energy and emit it in the form of radiation.

An electron in an excited state (e.g., heated up) drops to a lower energy state and looses this excess energy. 

If heated up again, the electron can gain energy again and move to a high energy state. The moving charge of the electron creates an oscillating
magnetic field , which creates an oscillating electric field perpendicular to it.

>Electric waves wavelengths and frequencies come in wide a spectrum.

Visible light spectrum is the segment of the electromagnetic spectrum that the human eye can view

![[1d.png]]

>At the Airport, they used gamma ray to scan customer's bag!

**Can we use EM waves to communicate?**
Yes. We can encode information by sending an EM source and varying its properties (e.g., brightness, colour, etc.)
**What frequency should we use?**
EM radiation acts differently at different wavelengths. Higher frequencies are more dangerous to humans. High and low frequencies tend to go through objects (IR, visible and UV tend to be dissipated by air, can be reflected or refracted by objects). Lower and middle frequencies are easier to make and control with circuits. Higher frequencies are more difficult and expensive to make: need to module high frequencies very precisely.

We use Radio frequency: 3kHz to 300 GHz. Easy to generate, good propagation characteristics, relatively safe for humans
## How to Generate EM waves?
Need some way to generate EM waves in a controllable way (i.e., very
specific frequencies, with certain patterns to encode data). Electricity in a wire produces an EM field!

![[2d.png]]

By taking another wire and placing it next to the first one when electric current is flowing, the magnetic field created by the flowing current induces current on the second wire, too. 
- In wired networks, this can be bad (can cause crosstalks)
- In wireless networks, this can be good! We modulate communication in one wire and it appears in the other one

![[3d.png]]

## How do we structure these wires?
To make electricity flow in a wire, you need to have two points with a difference voltage. Particular antenna design: dipole (bend wires to improve signal strength)

**RF Circuits**: Circuiti in cui l'elettricità che li attraversa è modulata a radiofrequenze.

![[4d.png]]

# RF Transmitter
An RF Transmitter is a RF circuit that takes data as input (sequence of 0s and 1s) and produces a fluctuating magnetic field as a output that propagates out and can be received by a receiver further away.

>RF = Radio Frequency

![[5d.png]]

## Why higher wave amplitudes mean stronger signals?
We have seen that objects that generate or radiate electromagnetic waves create an electromagnetic field which carries energy through space. The amplitude of an electromagnetic wave is the peak value of the electric field $\vec E$ and magnetic field $\vec B$ , i.e., the maximum strength of the fields. 
The energy carried by an electromagnetic wave is proportional to its amplitude squared (quadrato).

![[6d.png]]

```ad-example
This is an Example of two waves with equal frequency/wavelength but different amplitudes!

![[7d.png|500]]

The same waves with Gaussian noise. It is still easy to see peaks and troughs of the red wave, while it is much more difficult for the blue one.

![[8d.png|500]]

```

# RF Receiver
![[9d.png]]
When two phase of the same frequency overlap, their amplitudes combine according to the principle of superposition:
- If the ==waves are in phase== (peaks align with peaks and troughs with troughs), they add up, leading to **constructive interference (stronger signal)**.
- If the ==waves are out of phase== (they are shifted) (one wave’s peak aligns with the other’s trough), **they cancel each other out**, leading to destructive inferences (nullified signal).

For this reason:
-  Different protocols use different frequencies.
- Multiple antennas are usually deployed
- Adaptive modulation


# Antenna Design
We have seen that antennas create an EM field that is propagated through a direction. The field (i.e., the signal) has an orientation, i.e., it is polarised in a direction. In order to be able to receive the signal, the orientation of the receiver antenna must match that of the transmitter.

![[1e.png]]

## Radiation Patterns
We can classify antennas depending on the ==radiation pattern==. The radiation pattern is the **graphical representation of the radiation strength of the antenna as a function of space**. 

![[2e.png]]

### Omnidirectional Antenna
![[3e.png]]
A forma di ciambella (o toro), irradia in modo uniforme in tutte le direzioni del piano, tagliandolo orizzontalmente (la potenza diminuisce sopra e sotto il piano). Ampiamente utilizzato negli Access Point (AP) e nelle schede di interfaccia di rete (NIC).
  
### Directional antenna (Yagi)
![[4e.png]]

### Directional antenna (parabolic)
![[5e.png]]
Has a metal parabolic reflector with an antenna suspended at the focus.
Uses properties of elliptic paraboloids: the parabolic reflector transforms an incoming plane wave travelling along the axis into a spherical wave converging toward the focus. Conversely, a spherical wave generated by a point source placed in the focus is reflected into a plane wave.

È dotato di un riflettore parabolico metallico con un'antenna sospesa nel fuoco. Sfrutta le proprietà dei paraboloidi ellittici: il riflettore parabolico trasforma un'onda piana in arrivo che viaggia lungo l'asse in un'onda sferica che converge verso il fuoco. Viceversa, un'onda sferica generata da una sorgente puntiforme posta nel fuoco viene riflessa in un'onda piana.
### Antennas for IoT Devices
==PCB Antennas== (Printed Circuit Board Antennas) are antennas printed directly into the board of an embedded system - reduced dimensions and maintenance costs. Can be **directional** or **omnidirectional**.

Chip antennas are surface-mounted directly into the PCB. Mostly omnidirectional!

## Antenna Metrics - Gain
The ==gain $G$== of an antenna is a measure of **how well the antenna directs its radiated power in a specific direction compared to an isotropic antenna**. An ==isotropic antenna is an ideal antenna that radiates the signal equally in all directions==. This means that the **gain is defined for each possible direction around the antenna, as antennas emit EM waves with different energy in different directions**.

For this reason, we usually talk about the ==maximum gain of an antenna==, which is the **gain in the direction when the antenna radiates the most power** (main lobe).

![[6e.png|250]]

![[7e.png]]

>Is usually expressed in Decibels (dB). 

We can also **express the antenna gain in terms of its effective aperture**, or effective area $A_l$. It is a constant factor of the antenna measuring how much signal power it is able to capture (larger effective area $\to$ more signal power captured $\to$ better reception).

$$G = \frac{4\pi A_l}{\lambda^2} \hspace{0.5cm} \text{Where} \hspace{0.2cm} \lambda \hspace{0.3cm} \text{is the wavelength of the signal}$$

- In a ==transmitting antenna==, the ==gain== describes **how well the antenna converts electrical power into radio waves headed in a specified direction**.
- In a ==receiving antenna==, the ==gain== describes **how well the antenna converts radio waves arriving from a specified direction into electrical power**.

## Antenna Metrics - Bandwidth
The ==Bandwidth== of an antenna is **the range of frequencies over which the antenna can effectively transmit or receive signals**.

**Wideband antennas** (antenne a banda larga) can transmit more data by using a **larger portion of the frequency spectrum** (more information can be transmitted simultaneously).

A **narrowband antenna** (antenna a banda stretta) can only transmit data within a small part of the frequency spectrum (limited amount of data can be sent). 

**Are large bandwidth antennas better than low bandwidth antennas?**
It very much depends on the application!
## Directionality

| **Omnidirectional**                                                 | **Directional**                                                            |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Used to send EM signals to<br>receivers whose location is not fixed | Used to send EM signals to fixed<br>receivers (satellite TVs, space craft) |
| Easier to install                                                   | Harder to install                                                          |
| Prone to interferences                                              | Less interferences                                                         |
| Lower gain and directivity                                          | Higher gain and directivity                                                |

----

# Signal Propagation

## Wireless Channels
![[2q.png]]

## Signal Propagation
What happens to radio waves between antennas?
The signal does not travel in a straight line!
![[3q.png]]

Radio waves lose energy as they propagate (path loss) by going through air.
Radio waves get deflected or reflected when they hit objects.
They bounce into objects and then recombine (multipath or fading).

## Free space propagation
Consider a free space propagation model. Consider an ideal point source of EM waves which emanates power $P_T$ equally in all directions. Energy emanated at the source expands out in a spherical way. A receiver on the sphere at distance receives power:
![[4q.png]]
where $L$ is the free space pathloss. Notice that this depends on the effective area of the receiver and that signal decreases proportionally to the square of the distance to the sender.

We can express the free space propagation formula also in terms of the gains of the antennas. If the transmitter and receiver antennas have gain respectively, then the power at the receiver is:
$$P_R = P_T G_t G_R (\frac{\lambda}{4 \pi r})^2$$
The free space propagation model is useful for gaining intuition on how much signal strength you should expect between two points in a perfect idealized environment.

![[21q.png]]

## Path Loss Effects
In reality, **the space between the transmitter and the receiver is not free**.
==EM waves interact with objects==. This can be bad (signal degradation) or good (can leverage some effects to improve the signal). The interactions can produce different kinds of effects.

1. **Shadowing**: is the effect that causes the fluctuation of a signal’s power due to objects obstructing the propagation path. Shadowing losses depend on the frequency of the EM wave: EM Waves can penetrate through various surfaces but at the cost of loss in power i.e signal attenuation. The losses depend on the type of the surface and frequency of the signal.
	![[5q.png]]

2. **Reflection**: similarly to light hitting a mirror, a signal can be reflected when hitting an object. This can be good: as we have seen, in directional antennas reflectors are used to amplify the signal and focus it in the desired direction. Reflection effects depend on the object that the signal hits. Some materials have good reflection properties (e.g., mirrors, some metals).
	![[6q.png]]
3. **Refraction**: is the change in direction of a wave passing from one medium to another. As light going through water is bent, EM waves can changetheir direction after passing through some means, e.g., glass or drywall.
	![[7q.png]]
	
4. **Scattering** is the reflection of the signal in multiples directions  when hitting an uneven surface.
	![[8q.png]]

5. **Diffraction**: is the interference or bending (curvatura) of waves around obstacles or through an aperture into the region. Does not happen much with high frequency signals. Low frequency signals can bend over buildings, trees, and even around the curvature of the Earth. That is why we are able to receive AM radio signals around the curve of the Earth with low enough frequencies.
	![[9q.png]]

>In real life, the way signals propagate very much depends on the environment. The signal received is a multi-path, composed of several signals that are then added together.

![[10q.png]]

## Wireless signals propagate like waves
Matching waves construct, opposite wavelengths destruct. 

![[11q.png]]

When two waves interfere, the resultant wave may have greater amplitude (constructive interference) or lower amplitude (destructive interference) if the two waves are in phase or out of phase, respectively. 

When you have a transmitter and a receiver, the receiver does not only get the signal from the direct path from the transmitter (i.e., line of sight), but also all the signal bouncing around coming from the transmitter and reaching the receiver (multi path).

Frequency of the EM waves can have massive effect on how they propagate. An IoT designer has to make decisions on what protocol to use, i.e., on what frequency to use between their devices.

![[12q.png]]


# More about Attenuation
![[15q.png|500]]
La composizione dell'aria può avere un impatto significativo sulla propagazione del segnale. Se si ha una pioggia più leggera, come una pioggerellina, come mostrato nella linea inferiore, l'attenuazione è più debole. La nebbia ha un forte impatto sull'attenuazione, così come la luce visibile.
## Interference changes with distance from line of sight path
Come abbiamo visto, anche le **antenne direzionali in realtà si propagano in tutte le direzioni**. The signal is transmitted to the receiver and it is stronger along the ==line of sight (LOS)== and weaker as it gets farther from it. Signal gets reflected, diffracted, refracted etc on objects standing between the transmitter and receiver antennas, creating a multi path effect.
### Fresnel Zones
==Fresnel zones== are ellipsoids between transmitter TX and receiver RX.

![[16q.png]]

Objects reflecting the signal in the ==odd zones== have a disruptive effect.
Objects reflecting the signal in the ==even zones== have a constructive effect.

![[17q.png]]

>Usually we are interested only in the first three zones, since the signal is very weakened outside the third Fresnel zone.

## Is the attenutation good or bad?
In some environments, there are many nodes that need to transmit. For instance, a building or any office. What if there is not enough capacity? 

1. One possible solution: deploy more access points! This is not a good solution, as they are going to interfere with one another, causing many collisions.

> In dense environments, more attenuation is good!

2. more attenuation is caused by walls and objects in the office.

## Water Attenuation
Humans are more similar to sea water. Elements can store water, like trees and soil. This is the reason why some environments drop drastically their statistics if it starts raining.

## Spectrum Division
Return back to te previous office example. 
A possible solution for guaranteeing enough bandwidth to all nodes while avoiding collision is spectrum division. Many standards support different channels.

**How to deploy APs and to set up wavelengths for transmitting/ receiving in an efficient way?**

## Vertex Colouring Problem
==Decisional problem==: Given a graph and different colours, is it possible to colour each vertex of with one of the colours such that no two neighbour nodes have the same colour? (NP-complete)

==Optimisation problem==: Given a graph , what is the minimum number of
colours that we must use so that each vertex is coloured and its colour is different from the colours of its neighbours? (NP-hard)

**Minimum number of colours for the vertex colouring problem is called the chromatic number of .**

Create a graph whose vertices are APs. An edge between two nodes exists if the two corresponding APs are within radio range with each other. Colours represent different channel frequencies. We can also create a weighted graph where edge weights are the percentage of overlap of two APs.


## MIMO (Multiple Input Multiple Output)
```ad-abstract
title: Definition
==MIMO (Multiple Input Multiple Output)== is a **wireless technology** that uses
**multiple antennas at both the transmitter and receiver** to improve communication performance.

```

Increase the data rate, reliability and coverage. 
Several techniques used in MIMO wireless network:


## Spatial diversity
I segnali possono subire fenomeni di **fading multipath**, che possono provocare la perdita del segnale. Per contrastare questo problema, si utilizza la **diversità spaziale**, una tecnica che consiste nell’inviare più versioni ridondanti dello stesso segnale lungo percorsi diversi, in parallelo. In questo modo, **aumenta la probabilità che almeno una copia del segnale arrivi con una buona qualità**.

Le antenne poste sul ricevitore sono in grado di **catturare frammenti del segnale**, anche se questi risultano diffusi o diffratti, e di **ricomporli attraverso tecniche di elaborazione del segnale**, migliorando così l’affidabilità e la robustezza della comunicazione.

Questa tecnica è **adottata nelle reti 4G LTE**, grazie all’utilizzo di antenne multiple.

![[19q.png]]

## Spatial Multiplexing
A differenza delle tecniche che contrastano il **fading multipath**, il **multiplexing spaziale** ne **sfrutta le caratteristiche** per aumentare la velocità di trasmissione. In particolare, il trasmettitore **suddivide il flusso di dati in più sottostream indipendenti** e li invia **simultaneamente attraverso antenne diverse**.

A causa della propagazione multipath e dell’attenuazione, questi segnali possono **raggiungere il ricevitore in momenti diversi** o con **intensità variabile**, a causa di **interferenze costruttive o distruttive**.

Il ricevitore rileva una **combinazione lineare dei segnali trasmessi su ciascuna delle sue antenne**, e attraverso tecniche di elaborazione del segnale è possibile **ricostruire il flusso dati originale**.

Questa tecnica è impiegata nelle **reti Wi-Fi 6, 4G LTE e 5G**, dove consente di migliorare significativamente il throughput.


![[20q.png]]
## Beamforming
Il **Beamforming** è una tecnica in cui il trasmettitore **indirizza il segnale verso un dispositivo specifico**, anziché trasmetterlo uniformemente in tutte le direzioni. Ogni antenna coinvolta nella trasmissione contribuisce al segnale, ma lo fa **regolando fase e ampiezza** in modo preciso. Questo coordinamento fa sì che i segnali si **combinino in modo costruttivo** nella direzione desiderata e **in modo distruttivo** altrove.

Di conseguenza, l'energia trasmessa viene **focalizzata in un fascio stretto**, migliorando **la potenza del segnale, la portata e l'efficienza di trasmissione complessiva**.

Il beamforming è ampiamente utilizzato nelle reti **Wi-Fi, 4G LTE, 5G e nei sistemi radar** per migliorare le prestazioni e ridurre le interferenze.

## Multi User MIMO 
Beamforming is particularly effective to implement a multiple-user MIMO. The transmitter can use its multiple antennas to send data to multiple users simultaneously. In 5G networks, we talk about Massive MU-MIMO!
# Modulation

```ad-abstract
title: Definition

==Modulation== **is the process of varying one or more parameters** (frequency $f$,
amplitude $A$, phase $\phi$) **of a waveform** (a sine) to encode data. $(g(t)=A_t \sin(2 \pi f_t + \Phi_t))$
```

Bits are encoded into a signal (modulating or message signal)
The carrier signal (segnale portante) is a high frequency signal that is combined with the modulating signal (modulante) and altered in some of its features.

Amplitude Modulation (AM) is widely used for analog data transmission, e.g.,
voice or video, as the AM radio.
The amplitude of the carrier signal is modified to encode the modulation signal. 
For binary signals, we use the term “Amplitude shift keying”.

## Amplitude Shift Keying (ASK)
Used for binary signals 
- **Pro**: cheap hardware
- **Cons**: amplifies noise, inefficient use of bandwidth and power.

## Frequency Shift Keying (FSK)
Vary the frequency of signals and uses two different frequencies to represent 0s and 1s. 
- **Pros**: less sensitive to noise, robust to variations in attenuation
- **Cons**: requires larger bandwidth.

## Phase Shift Keying (PSK)
Vary the phase of the signal by moving the signal 180° out of phase for 0s
and 1s. 
- Pros: Power efficient, less susceptible to errors than ASK
- Cons: Can be difficult to implement, worse noise rejection than FSK.

>**Constellation diagram**: representation of the transmission using polar coordinates.

![[1z.png|600]]

## Constellation Diagram
Ogni punto di un **==diagramma a costellazione==** rappresenta una **"parola" del segnale**, dove **l'angolo indica la fase** e **la distanza dall'origine rappresenta l'ampiezza del segnale**, ovvero la sua potenza.

>A constellation diagram can be used to describe a particular modulation scheme. 

```ad-example
In this example, we encode $0s$ with an in phase signal and 1s with signals having a 180° shift. Both have fixed amplitude.
![[Pasted image 20250411184139.png]]
![[Pasted image 20250411183919.png]]

```

If we allow 90° phase shifts, then we get a 4-PSK. This allows us to send bits twice as fast as encoding two bits instead of one. Constellation Diagram can also be used for visualising received information. Assume one receives a signal that is mapped in point. There is a chance that the transmitter was trying to send $11$, but most likely they were trying to send $10$.

Receivers implement estimation algorithms (e.g., maximum likelihood) to recover the received signal.
## Common Phase-Amplitude Modulations
![[4z.png]]

## Constellation Diagram and Beyond
Each point in a constellation diagram is called **symbol** or **word**.
• Tuttavia, non tutti i "simboli" si adattano a un diagramma a costellazione.
• I diagrammi a costellazione codificano l'ampiezza e la fase del segnale per una frequenza fissa, ma è possibile modulare i segnali anche utilizzando frequenze diverse.
• Un simbolo è un'onda sinusoidale con una certa frequenza, ampiezza e fase.
• Modificando questi parametri, è possibile creare una codifica in parole.

For example:
![[5z.png|600]]
![[6z.png|600]]

>Transmission Rate: $\log(D \cdot N)$
>$D$: number of Diagrams
>$N$: number of points in each diagram
## Symbol rate and bit rate
**Symbol rate**: is the number of symbols that we can transmit per second.
**Bit Rate**: is the number of bits that we can transmit per second.

==Relationship==: `BR = SR x number of bits encoded by a symbol`

>Longer words encoded per symbol means higher bit rate

```ad-important
==High order modulation packets== allows more bits per symbol (higher
maximum channel capacity), but if symbols are close together in space,
small noise fluctuations can cause the receiver to decode the wrong
symbol, increasing the Bit Error Rate (BER).

```

$$BER=\frac{\# \text{mistakenly received bits}}{\text{total \# transmitted bits}} = \frac{10011011}{00011111} = BER=0.25$$
Note that the **data rate** of a channel is the ==actual speed at which data is
transmitted over the channel==, whereas its **capacity** is the maximum possible rate
that can be achieved without errors. How can we decrease bit error rate? 
By increasing the amplitude of the symbols, which means, increase the
points’ power (of course this has to correspond to larger distance in the
diagram).

>Distance calculated with the Euclidean Distance formulas

![[7z.png]]

So, the BER decreases when SNR grows, since $SNR = \frac{P_\text{signal}}{P_\text{noise}}$
Explicit formulas formalise the relation between BER, SNR and minimum distance (we will not see them). Is this surprising?  NO. Shannon-Hartley theorem says that
$$C = B \log_2(1+SNR)$$
so, to increase capacity with modulation, we still must increase bandwidth or SNR.

## More about bandwidth and frequencies
We will see that protocols and standards operate within specific frequency bands. For example, the IEEE 802.15.4 standard functions in the 2.4 GHz frequency band, which is not a single frequency but rather a range of frequencies. Within this band, 802.15.4 defines 16 channels, each with a bandwidth of 2 MHz. The center frequencies of these channels span from 2.405 GHz to 2.480 GHz, with each channel spaced 5 MHz apart.

![[8z.png]]

```ad-question
title:Why more bandwidth means higher data rate?
Because more bandwidth means supporting more frequencies, hence
more possible symbols and more parallel channels!
```
Ma abbiamo visto molti schemi di modulazione in cui la frequenza è fissa e cambiano solo la fase e/o l'ampiezza! Abbiamo visto che è necessario che il segnale sia sufficientemente potente da aumentare l'SNR, ma in questi casi possiamo comunque trasmettere un segnale con larghezza di banda pari a 0!

Qualsiasi funzione derivabile infinite volte, possiamo scriverla come avente un polinomio.
Invece, questo significa che: qualsiasi funzione periodica e integrabile in $[0,T]$, può essere scritta come la seguente somma infinita di seni e coseni.
![[9z.png]]
![[10z.png]]

```ad-info
title: Recap
Una maggiore potenza del segnale comporta un rapporto segnale/rumore (SNR) più elevato, che a sua volta riduce la probabilità di errori. L'aumento della larghezza di banda consente la trasmissione di più bit per simbolo e l'invio simultaneo di più segnali paralleli, entrambi fattori che contribuiscono a un bit rate più elevato. Di conseguenza, sia una maggiore potenza del segnale che una maggiore larghezza di banda aumentano la capacità massima di un canale di comunicazione. Tuttavia, i dispositivi che supportano comunicazioni su larghezze di banda elevate richiedono circuiti più complessi, il che comporta un maggiore consumo di energia elettrica.
```


## Channel Multiplexing
We can choose to **divide the frequency band into many channels with narrow bandwidth**s. This approach allows for greater parallelism, meaning that more users can share the available spectrum. Additionally, narrowband signals typically **require less transmission power**. However, **each of these channels supports a lower data rate**. 

Alternatively, we can split the frequency band into fewer wideband channels. This results in higher bandwidth per channel, which increases the number of bits transmitted per second and is more efficient for high-speed applications. On the downside, fewer users can access the channel simultaneously, and wideband communication generally requires more power.

We have seen that the bandwidth of a channel is the difference between the
highest supported frequency and the lowest supported frequency . Consider two channels with the same bandwidth and SNR, but operating at different frequencies.

![[12z.png]]

The Shannon Hartley theorem says that the maximum bps that they can
achieve is the same. Nevertheless, in practice, channels operating at higher frequencies can deliver more bps (more efficient antenna design, modulation, wider available bandwidth).


```ad-info

**Bandwidth (B)** is defined as the difference between the highest and the lowest frequencies that a communication channel can support. In other words, it represents the range of frequencies over which the channel can effectively transmit signals.

==Mathematically==: B = f<sub>high</sub> – f<sub>low</sub>
```



```ad-bug
END OF FIRST MIDTERM PROGRAM!

```


# Multiplexing (QUESTO NON CI STA PER L'ESONERO)
Multiplexing is a transmission technique that enables the simultaneous transmission of multiple different signals over a single communication channel. This allows for parallel communication with multiple users, even in the absence of technologies like MIMO (Multiple Input Multiple Output). Multiplexing is often utilized by MAC (Medium Access Control) layer protocols to efficiently manage access to the shared communication medium. There are several types of multiplexing techniques, including Space Division Multiplexing (SDM), Frequency Division Multiplexing (FDM), Time Division Multiplexing (TDM), and Code Division Multiplexing (CDM). Each of these methods separates signals in a different domain to allow multiple transmissions to coexist without interference.


## Space Division Multiplexing (SDM)
Spatial Division (SPD) is achieved through MIMO (Multiple Input Multiple Output) technology. The communication channels established between a transmitter and a receiver are physically separated because the antennas at both ends are placed at some distance from one another and can be oriented in different directions.

Smart antennas, which are arrays of antennas connected to the same device, can work together by adjusting their configurations. This coordination enables them to perform beamforming, a technique that focuses the signal in specific directions, allowing the transmission and reception of multiple signals in parallel.

It is important not to confuse SPD with spatial multiplexing, as they refer to different concepts within wireless communication.

![[13z.png]]

## Frequency Division Multiplexing (FDM)
Frequency Division Multiplexing (FDM) divides the available frequency range into non-overlapping bands, each assigned to a distinct sub-channel that can operate continuously. To prevent adjacent channel interference, guard bands are used to separate these sub-channels. FDM is simple, as the receiver only needs to tune to the frequency of the desired sender, making it ideal for applications like FM radio broadcasting. However, it is inefficient for mobile communication, as assigning a dedicated frequency band to each device would be impractical.

## Time Division Multiplexing (TDM)
Each channel is allocated the entire bandwidth for a specific duration, with all senders using the same frequency at different times. Time slots are separated by guard spaces, and this method does not require MIMO. It can also be combined with FDM.

## Code Division Multiplexing 
Code Division Multiplexing (CDM) enables multiple channels to use the same frequency and time for transmission by assigning each channel a unique code. This separation is similar to people in the same room speaking simultaneously at the same volume in different languages. CDM achieves this through spread spectrum techniques.

## Spread Spectrum
Spread spectrum techniques expand the bandwidth to transmit data, transforming narrowband signals into spread-spectrum signals while maintaining the same power. The resulting signal is difficult to distinguish from noise, offering higher security. The receiver can still identify the original signal. The two main techniques are Frequency Hopping Spread Spectrum (FHSS) and Direct Sequence Spread Spectrum (DSSS).

![[14z.png|400]]

## Frequency Hopping Spread Spectrum (FHSS)
Uses a combination of Frequency Division Multiplexing and Time Division
Multiplexing, with guard bands.

![[15z.png]]
![[16z.png]]
![[17z.png]]
![[18z.png]]
![[19z.png]]
![[20z.png]]
![[21z.png]]
![[22z.png]]

## Direct Sequence Spread Spectrum (DSSS)
Direct sequence spread spectrum (DSSS) systems take a user bit stream
and perform an (XOR) with a so-called chipping sequence.
• It consists of a sequence of smaller pulses, called chips, with a duration .
• : duration of a bit (inverse of the bit rate) $t_b > t_c$.
• If the chipping sequence is generated properly it appears as random noise.

![[23z.png|500]]

The receiver generates the same pseudo random chipping sequence as the
transmitter. 

Sequences at the sender and receiver have to be precisely synchronized: the receiver calculates the product of the chipping sequence with the incoming signal.

![[24z.png]]

## Code Division Multiplexing
Each channel is assigned with a different code, which can be either a different hopping sequence or a different chipping sequence, depending on the spread spectrum technique used. In DSSS, to minimize overlaps between channels, chip codes must distant enough, in particular, they should be orthogonal (their dot product should be equal to 0).

