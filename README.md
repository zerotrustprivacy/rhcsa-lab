---

# RHCSA Lab Environment

## Overview

This repository contains the configuration and automation scripts required to deploy a local lab environment for Red Hat Certified System Administrator (RHCSA) exam preparation. It utilizes **Vagrant** and **VirtualBox** (or KVM/Libvirt) to provision virtual machines that mimic a standard RHEL environment.

This lab allows candidates to practice essential objectives, including user management, storage configuration, service management, containerization, and networking, in a safe and reproducible environment.

## Prerequisites

Before deploying the lab, ensure your host machine meets the following requirements:

* **Operating System:** Windows, macOS, or Linux.
* **Virtualization:** VirtualBox (recommended) or KVM/Libvirt.
* **Automation:** Vagrant (latest stable version).
* **Resources:** At least 4GB of free RAM and 2 CPU cores available for the virtual machines.

## Quick Start

Follow these steps to initialize the lab environment.

### 1. Clone the Repository

Open your terminal and clone the repository to your local machine:

```bash
git clone https://github.com/zerotrustprivacy/rhcsa-lab.git
cd rhcsa-lab

```

### 2. Review Configuration

Check the `Vagrantfile` to verify the VM settings (RAM, CPU, and IP addresses) match your host machine's capabilities.

### 3. Build the Lab

Run the following command to download the base image and provision the virtual machines:

```bash
vagrant up

```

Depending on your internet connection speed, this process may take several minutes as it downloads the operating system image (Box) and runs the initial provisioning scripts.

### 4. Access the Environment

Once the build is complete, access the primary server using SSH:

```bash
vagrant ssh

```

Or, if multiple nodes are defined (e.g., server1, server2):

```bash
vagrant ssh server1

```

## Lab Topology

By default, this automation creates the following environment:

| Hostname | IP Address | Role |
| --- | --- | --- |
| **server1** | 192.168.56.101 | Primary study node |
| **server2** | 192.168.56.102 | Secondary node (for networking/SSH labs) |

*Note: IP addresses may vary based on the specific subnet definition in the Vagrantfile.*

## Practice Objectives

This environment is configured to allow you to practice the following EX200 exam objectives:

* **Essential Tools:** Using grep, vim, and file redirection.
* **User and Group Management:** Creating users, adjusting password policies, and managing group memberships.
* **Storage Management:** Creating partitions, logical volumes (LVM), and configuring filesystems (xfs, ext4, vdo, stratis).
* **Service Management:** Using systemd to start, stop, and enable services.
* **Network Configuration:** Configuring nmcli, hostnames, and DNS resolution.
* **Security:** configuring firewalld and managing SELinux contexts/booleans.
* **Containers:** Managing images and containers using Podman.

## Resetting the Lab

To practice creating configurations from scratch, or if you break the system during testing, you can easily destroy and rebuild the environment:

```bash
# Destroy the current VMs
vagrant destroy -f

# Rebuild a fresh environment
vagrant up

```

## Troubleshooting

### "VT-x/AMD-V is disabled"

Ensure that hardware virtualization is enabled in your host computer's BIOS/UEFI settings.

### SSH Authentication Failures

If `vagrant ssh` fails, try removing the old host keys from your local machine:

```bash
ssh-keygen -R 192.168.56.101

```

### Network Conflicts

If the specified IP range conflicts with your local network, modify the IP addresses in the `Vagrantfile` before running `vagrant up`.

## License

This project is open-source and available for educational purposes.
