const ArtHall = artifacts.require("ArtHall")
//const BUSD = artifacts.require("BUSD")

module.exports = async function(deployer) {
	//deploy Token

	await deployer.deploy(ArtHall, "https://gateway.pinata.cloud/ipfs/QmbnKjANHCSJNpBUPtJC3HELN6fByPM4UswMnKepUoxYQd")
};