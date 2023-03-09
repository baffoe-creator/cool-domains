const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    // We pass in "herb" to the constructor when deploying
    const domainContract = await domainContractFactory.deploy("Herb");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // We're passing in a second variable - value. This is the moneyyyyyyyyyy
    let txn = await domainContract.register("ntampi",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain ntampi.herb");
    const address = await domainContract.getAddress("ntampi");
    console.log("Owner of domain ntampi:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();