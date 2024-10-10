Two patterns are similar if the measure of the distance between their feature vectors is small (three basic issues: what is a good distance measure, which are the best features, what is the difference margin to accept)

# Pattern recognition in different kinds of ways

## Content based image retrieval
- Classes = types of objects
- Pattern = allows to distinguish a face from a flower
- Recognition
	- classes = subclasses of a same type
	- Pattern = allows to distinguish a subclass
- Biometrics
	- Classes = individuals
	- Pattern = allows to distinguish among individuals

# What is biometrics?
```ad-abstract
title: Biometrics
From Greek "bios" and mètron, is the measure and statistical analysis of biological data.

In technological sense = measure and analysis of physical and/or behavioral characteristics to
authenticate/recognize a person.

```

> Biometric Consortium = automatic recognition of a person according to discriminative characteristics.

_Basic Assumption:_ each person is unique
Main issues: 
- Determinate the unique features able to identify a person.
- Find reliable techniques to measure such features.
- Devise reliable algorithms to recognize/classify a person according to the measured features.

The case of the study is the logical access such as electronic resources or critical data.

# Why biometric system

Recognition (often for authentication purpose) is performed according to two modalities:
1. _Something one owns_: A cars or a document but it can be lost, or stolen, or copied. Actually the system authenticates the object, not its owner.
2. _Something one knows_: An individual or community password but it can be guessed, or forgotten. Remember (easy to remember = easy to guess).

The biometric system is based upon what one is 

![[1.png|500]]

# Little bit of history

- 1882: Alphonse Bertillon introduce a new system of bodily measure expressly devised to identify criminals. This measure should have identified uni vocally an individual.
	- hand shape
	- head shape
	- bust measure
	- limbs measure
	- face details
	- and more...
- End of $XIX$: Galton (The father of fingerprints) introduce the notion of Minutia by find a statistical point of view in Bertillon system. Minutia introduce system to classify fingerprints.
- 1893, UK recognized that no pair of individuals has the same fingerprints.

>This is an important discovery for the science but also for the biometric system.

![[data statistic.png]]

## Architecture of a biometric system

### Enrollment
Capture and processing of user biometric data for use by system in subsequent authentication operations.

![[3.png]]

>Feature Vector contain characteristic person.

```ad-info

Remember that when we compare identity, we compare template
```

### Recognition
Capture and processing of user biometric data in order to render an authentication decision based on the outcome of a matching process of the stored to current template (verification 1:1, identification 1:N).

>1:N $\to$ compare 1 template to the oter

![[4.png]]

```ad-info
_Probe_: each template which is submitted for recognition.
_Gallery_: the set of templates pertaining to enrolled subjects.
```

Very very important thing is the threshold, must be carefully value:
- If distance is below the threshold $\to$ Okay
- If distance is above the threshold $\to$ No

# Modules of a biometric system
A biometric system is generally designed to operate with four
modules.

• Sensor Module : where biometric data are caught.

• Feature extraction module : where a set of main characteristics is extracted from acquired data. During enrollment it produces the templates to be stored in the system.

• Matching module: where extracted features are matched with stored templates to return one or more matching scores.

• Decision module: where a decision is made according to matching results.

# Types of users

- _Cooperative_: the user is interested in recognition (an impostor might try to be recognized as a legal user).
- _Non-cooperative_: the user is indifferent or even adverse to recognition (an impostor might try to avoid being recognized).
- _Public/ Private_: users of the system are customers or employees of the entity installing the system.
- _Used/Non used_: frequency of use of the biometric system (more times a day, daily, weekly, monthly, occasionally ...).
- _Aware/Not aware_: the user is aware or not of the recognition process.

# Type of settings
- _Controlled_: capture settings can be controlled, distortions mostly avoided (e.g., for face, pose, illumination, and expression), defective templates can be rejected, and capture repeated.
- _Uncontrolled/Undercontrolled_: capture settings cannot be controlled, template can present various levels of distortion, defective templates can be rejected, but capture cannot be repeated.

# Types of recognition operation

- _Verification_: the user claims an identity, possibly by presenting an ID card or other additional stuff $\to$ the system performs a 1:1 matching to verify the claimed identity $\to$ possible result = accept/deny
- _Identification_: no claim by the user $\to$ the system has to determine the correspondence with one of the subjects in the system gallery by a 1:N matching operation $\to$ possible result = recognized identity.

![[6.png]]
# Types of identification

- _Open set_: The system determines if probe $p_i$ belongs to a subject in the gallery $G$. Some probe might not belong to any subject in $G \to$ the system has a reject option.
	- _Possible errors_: reject a probe belonging to an enrolled subject or accept a probe non belonging to an enrolled subject or to return the wrong identity.
- _Closed set_: all probes belong to enrolled subjects.
	- _Possible error_: return the wrong identity.
- _Watch list_: the system has a list of subjects and checks if the probe belongs to the list.
	- _White list_: subjects in the list are granted access.
	- _Black list_: subjects in the list are rejected (possible alarm).

# Requirement for a barometric trait
_Universality_
- The trait must be owned by any person (except for rare exceptions ...)
_Uniqueness_
- Any pair of people should be different according to the biometric trait
_Permanence_
- The biometric trait should not change in time
_Collectability_
- The biometric trait should be measurable by some sensor
_Acceptability_
- Involved people should not have any objection to allowing collection/measurement of the trait
# 2003 Standard
We have 2003 standard minimum security requirements for an effective use of biometrics. This document discuss about minimum security requirements for an effective use of biometrics. We can classify into two types:
- Strong: Iris, Face, Fingerprint
- Soft: Haircolor, facial shape, gape

![[7.png]]

# Recap
Biometric traits are a "natural" authentication methodology

- Benefits
	- Biometric traits cannot be lost, lent, stolen or forgotten.
	- The user must only appear in person.

- Drawbacks
	- They do not ensure 100% accuracy
	- Some users cannot be recognized by some technologies (e.g. heavy workers show damaged fingerprints)
	- Some traits may change over time (e.g. face)
	- If a trait is “copied”, the user cannot change it, as it happens for usernames or passwords (plastic surgery ?)
	- Biometric devices may be unreliable under some circumstances.