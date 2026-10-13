const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const divider = document.querySelector('.project-divider');

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    cards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
    });

    if (divider) {
      divider.classList.toggle('hidden', !(filter === 'all' || filter === 'external'));
    }
  });
});

const topologyData = {
  isp: {title:"ViewQwest 10Gbps",role:"ISP UPLINK",copy:"Your home internet connection enters the lab here. The ONR/ONT hand-off is represented schematically; the exact physical mode depends on the ISP equipment configuration.",link:"projects/10gb-network.html",label:"Explore the 10Gb network"},
  proxmox: {title:"Proxmox Management",role:"HYPERVISOR MANAGEMENT",copy:"The Dell T5810 runs Proxmox VE and hosts the lab's virtual machines. Management uses the onboard NIC connected to the ASUS router, separate from the intended 10GbE data paths.",link:"projects/proxmox-homelab.html",label:"Explore Proxmox"},
  opnsense: {title:"OPNsense",role:"VIRTUAL FIREWALL / ROUTER",copy:"The virtual firewall is intended to handle WAN/LAN routing, DHCP, DNS and security experiments. The diagram shows the planned logical flow, not live traffic or live health data.",link:"projects/opnsense.html",label:"Explore OPNsense"},
  nextcloud: {title:"Nextcloud NAS",role:"PRIVATE CLOUD STORAGE",copy:"Nextcloud AIO runs as a VM service. The existing 4TB media share is exposed through external storage; cloud-drive migration, persistent mount checks and a second-drive backup remain planned work.",link:"projects/truenas.html",label:"Explore Nextcloud NAS"},
  ha: {title:"Home Assistant",role:"VIRTUAL SMART-HOME SERVICE",copy:"The primary Home Assistant environment runs in the Proxmox lab for local-first automations and device integration. A Raspberry Pi environment is shown separately as the backup path.",link:"projects/home-assistant.html",label:"Explore Home Assistant"},
  linux: {title:"Linux VMs",role:"LAB ENVIRONMENTS",copy:"Ubuntu, Kali and other Linux environments provide a place to practise administration, testing and security learning without confusing lab experiments with production systems.",link:"projects/proxmox-homelab.html",label:"Explore the homelab"},
  router: {title:"ASUS BE7200X",role:"MAIN HOME ROUTER",copy:"The ASUS router serves the home network. The topology shows the intended connection from the OPNsense LAN and the separate Proxmox management connection.",link:"projects/10gb-network.html",label:"Explore the network"},
  aimesh: {title:"Secondary ASUS Router",role:"AIMESH",copy:"The secondary ASUS router extends the home wireless network through the AiMesh ecosystem. The exact client path can vary by device and connection.",link:"projects/10gb-network.html",label:"Explore the network"},
  pi: {title:"Home Assistant Raspberry Pi",role:"BACKUP HA ENVIRONMENT",copy:"A separate Raspberry Pi Home Assistant environment is part of the setup. Treat this as a backup environment, not automatic high availability unless failover is specifically configured and tested.",link:"projects/home-assistant.html",label:"Explore Home Assistant"},
  clients: {title:"Client Devices",role:"HOME NETWORK",copy:"Phones, computers and other endpoints connect through the home network. The labels show broad endpoint capabilities, not measured throughput for every device.",link:"projects/10gb-network.html",label:"Explore the network"}
};
const topologyNodes = document.querySelectorAll(".topology-node[data-system]");
topologyNodes.forEach(node => {
  node.addEventListener("click", () => {
    const item = topologyData[node.dataset.system];
    if (!item) return;
    topologyNodes.forEach(other => {
      const selected = other === node;
      other.setAttribute("aria-pressed", String(selected));
    });
    document.getElementById("topology-detail-title").textContent = item.title;
    document.getElementById("topology-detail-role").textContent = item.role;
    document.getElementById("topology-detail-copy").textContent = item.copy;
    const link = document.getElementById("topology-detail-link");
    link.href = item.link;
    link.textContent = item.label + " →";
  });
});
