In IoT networks, smart devices collect data and work together
to accomplish a common objective.
Smart things form the perception layer of an IoT architecture.
These devices have very limited computation capacities and are scattered around possibly large areas. For these reasons, they must be able to communicate their data (raw or processed).

# Electromagnetism Theory
**Photon**: the smallest amount of energy that can be transported (quantum of energy). Has no mass, cannot be split, but only created or destroyed.
**Electromagnetic radiation**: electromagnetic waves that carry energy
distributed as “energy packets”, i.e., photons.
Energy that can be transported by a photon $E=hf$: , where $h$ is the Planck constant (very small, $\sim10^{-34}$) and is the frequency of the wave

![[9c.png]]
>Important is the concept of period of a function (wave)

For each wave we can know the amount of frequency and wavelength.
Large wavelength = small frequency
High frequency = Small wavelength

## Where does the energy for electromagnetic waves come from?
A vast range of electromagnetic waves are created when atoms or molecules drop from a higher state of energy to a lower one: in this way, they lose energy and emit it in the form of radiation.
An electron in an excited state (e.g., heated up) drops to a lower energy state and looses this excess energy. If heated up
again, the electron can gain energy again and move to a high
energy state. The moving charge of the electron creates an oscillating
magnetic field , which creates an oscillating electric field
perpendicular to it. Curiosity: all bodies at a temperature higher than the absolute zero (-273,15°C) emit electromagnetic radiations! (Planck’s
Law)

>Electric waves’ wavelengths and frequencies come in wide a spectrum.

Visible light spectrum is the segment of the electromagnetic spectrum that the human eye can view

![[1d.png]]

>At the Airport, they used gamma ray to scan customer's bag!

**Can we use EM waves to communicate?**
Yes. We can encode information by sending an EM source and varying its properties (e.g., brightness, colour, etc.)
**What frequency should we use?**
EM radiation acts differently at different wavelengths Higher frequencies are more dangerous to humans. High and low frequencies tend to go through objects (IR, visible and UV tend to be dissipated by air, can be reflected or refracted by objects). Lower and middle frequencies are easier to make and control with circuits. Higher frequencies are more difficult and expensive to make: need to module high frequencies very precisely.

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
To make electricity flow in a wire, you need to have two points with a voltage difference. Particular antenna design: dipole (bend wires to improve signal strength)

**RF Circuits**: Circuits where the electricity flowing through them is modulated at radio frequencies (we will learn about signal modulation later).

![[4d.png]]

# RF Transmitter
An RF Transmitter is a RF circuit that takes data as input (sequence of 0s and 1s) and produces a fluctuating magnetic field as a output that
propagates out and can be received by a receiver further away.

>RF = Radio Frequency

![[5d.png]]

## Why higher wave amplitudes mean stronger signals?
We have seen that objects that generate or radiate electromagnetic waves create an electromagnetic field which carries energy through space. The amplitude of an electromagnetic wave is the peak value of the electric field $\vec E$ and magnetic field $\vec B$ , i.e., the maximum strength of the fields. 
The energy carried by an electromagnetic wave is proportional to its amplitude squared.

![[6d.png]]

```ad-example
This is an Example of two waves with equal frequency/wavelength but different amplitudes!

![[7d.png|500]]

The same waves with Gaussian noise. It is still easy to see peaks and troughs of the red wave, while it is much more difficult for the blue one.

![[8d.png|500]]

```

# RF Receiver
![[9d.png]]
Radio frequencies span from 3 kHz to 300 GHz (bandwidth)
When two phase of the same frequency overlap, their amplitudes combine according to the principle of superposition:
- If the waves are in phase (peaks align with peaks and troughs with troughs), they add up, leading to constructive interference (stronger signal).
- If the waves are out of phase (they are shifted) (one wave’s peak aligns with the other’s trough), they cancel each other out, leading to destructive inferences (nullified signal).

For this reason:
-  Different protocols use different frequencies.
- Multiple antennas are usually deployed
- Adaptive modulation


# Antenna Design
We have seen that antennas create an EM field that is propagated
through a direction. The field (i.e., the signal) has a certain orientation, i.e., it is polarised in a direction. In order to be able to receive the signal, the orientation of the receiver antenna must match that of the transmitter.

![[1e.png]]

## Radiation Patterns
We can classify antennas also depending on the radiation patterns,
similarly to light sources. The radiation pattern is the graphical representation of the radiation strength of the antenna as a function of space. Defines the variation of the power radiated by an antenna as a function of the direction away from the antenna.

![[2e.png]]

### Omnidirectional Antenna
![[3e.png]]
Doughnut (or torus) shaped, radiates equally in all directions of the plane cutting it horizontally (power decreases above and below that plane). Widely used in Access Points (APs) and Network Interface Cards (NICs)

### Directional antenna (Yagi)
![[4e.png]]

### Directional antenna (parabolic)
![[5e.png]]
Has a metal parabolic reflector with an antenna suspended at the focus.
Uses properties of elliptic paraboloids: the parabolic reflector transforms an incoming plane wave travelling along the axis into a spherical wave converging toward the focus. Conversely, a spherical wave generated by a point source placed in the focus is reflected
into a plane wave.

### Antennas for IoT Devices
PCB Antennas (Printed Circuit Board Antennas) are antennas printed directly into the board of an embedded system - reduced dimensions and maintenance costs. Can be directional or omnidirectional.

Chip antennas are surface-mounted directly onto
the PCB. Mostly omnidirectional

## Antenna Metrics - Gain
The gain $G$ of an antenna is a measure of how well the antenna directs its radiated power in a specific direction compared to an isotropic antenna. An ==isotropic antenna== is an ideal antenna that
radiates the signal equally in all directions. This means that the gain is defined for each possible direction around the antenna, as antennas emit EM waves with different energy in different directions.

For this reason, we usually talk about the maximum gain of an antenna, which is the gain in the direction when the antenna radiates the most
power (main lobe).

![[6e.png|250]]

![[7e.png]]

It is an adimensional metric and is usually expressed in Decibels (dB). Decibels are a **logarithmic unit** used to measure ratios for several physical quantities. 

![[8e.png]]

We can also express the antenna gain in terms of its effective aperture, or effective area $A_l$. It is a constant factor of the antenna measuring how much signal power it is able to capture (larger effective area $\to$ more signal power captured $\to$ better reception).

$$G = \frac{4\pi A_l}{\lambda^2} \hspace{0.5cm} \text{Where} \hspace{0.2cm} \lambda \hspace{0.3cm} \text{is the wavelength of the signal}$$

- In a transmitting antenna, the gain describes how well the antenna converts input power into radio waves headed in a specified direction.
- In a receiving antenna, the gain describes how well the antenna converts radio waves arriving from a specified direction into electrical power.

## Antenna Metrics - Bandwidth
The Bandwidth of an antenna is the range of frequencies over which the antenna can effectively transmit or receive signals.

Wideband antennas can transmit more data by using a larger portion of the frequency spectrum (more information can be transmitted simultaneously).

A narrowband antenna can only transmit data within a small part of the
frequency spectrum (limited amount of data can be sent). Are large bandwidth antennas better than low bandwidth antennas? It very much depends on the application

![[9e.png]]

## Directionality

| **Omnidirectional**                                                 | **Directional**                                                            |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Used to send EM signals to<br>receivers whose location is not fixed | Used to send EM signals to fixed<br>receivers (satellite TVs, space craft) |
| Easier to install                                                   | Harder to install                                                          |
| Prone to interferences                                              | Less interferences                                                         |
| Lower gain and directivity                                          | Higher gain and directivity                                                |

# Signal Propagation
Continuato alla lezione di martedì 1 Aprile 2025!