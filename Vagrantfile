Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.hostname = "devops-platform"

  # Sync project folder
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"

  # VM resources
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "4096"
    vb.cpus = 2
  end

  # Provisioning
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update -y

    # Basic tooling
    apt-get install -y \
      ca-certificates \
      curl \
      gnupg \
      lsb-release \
      git \
      make

    # Node.js 20
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs

    # Docker
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker vagrant

    # Cleanup
    systemctl enable docker
    systemctl start docker
  SHELL
end
