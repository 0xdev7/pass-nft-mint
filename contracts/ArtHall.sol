
// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ArtHall is ERC1155Burnable, ReentrancyGuard, Ownable {

    using Strings for uint256;
    using SafeMath for uint256;
    
    enum CARD_STYLE {
        Red,
        Green,
        Blue,
        Bronze,
        Silver,
        Gold,
        Diamond,
        Rare
    }

    string public constant NAME = "The Art Hall";
    string public constant SYMBOL = "ARTHALL";

    bool public publicSale = false;
    mapping(address => bool) whitelist;

    mapping (uint256 => string) private revealURI;
    string public unrevealURI = "https://gateway.pinata.cloud/ipfs/QmbnKjANHCSJNpBUPtJC3HELN6fByPM4UswMnKepUoxYQd/3.json";
    bool public reveal = false;

    bool public endSale = false;

    string private _baseURIextended;
    uint256 private _priceextended = 0.4 ether;

    uint256 public totalMinted = 0;
    bool public pauseMint = true;

    uint256 public constant MAX_NFT_SUPPLY = 4000;
    uint256 public constant MAX_CLAIM_QTY = 500;

    mapping(uint8 => uint256) public supplies;
    mapping(address => uint256) public amountPerWallets;

    constructor(string memory _baseURI) ERC1155(_baseURI) {
        _baseURIextended = _baseURI;
    }
        
    function name() public pure returns (string memory) {
        return NAME;
    }

    function symbol() public pure returns (string memory) {
        return SYMBOL;
    }

    function setEndSale(bool _endSale) public onlyOwner {
        endSale = _endSale;
    }

    function setWhitelist(address _add) public onlyOwner {
        require(_add != address(0), "Zero Address");
        whitelist[_add] = true;
    }

    function setWhitelistAll(address[] memory _adds) public onlyOwner {
        for(uint256 i = 0; i < _adds.length; i++) {
            address tmp = address(_adds[i]);
            whitelist[tmp] = true;
        }
    }

    function setPublicSale(bool _publicSale) public onlyOwner {
        publicSale = _publicSale;
    }

    function withdraw() public onlyOwner() {
        require(endSale, "Ongoing Minting");
        uint balance = address(this).balance;
        address payable ownerAddress = payable(msg.sender);
        ownerAddress.transfer(balance);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(
            tokenId >= uint256(CARD_STYLE.Red) && tokenId <= uint256(CARD_STYLE.Rare),
            "ARTHALL: URI requested for invalid token type"
        );

        if(!reveal) return unrevealURI;
        return bytes(_baseURIextended).length > 0 ? string(abi.encodePacked(_baseURIextended, tokenId.toString(), ".json")) : "";
    }

    function random() internal view returns (uint256) {
        uint256 ran = 0;
        ran = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, totalMinted))).mod(8);
        return ran;
    }

    function claim(uint256 _qty) external payable
    {
        require(_qty > 0 && _qty <= MAX_CLAIM_QTY, "ARTHALL: Can't mint 0 or more than MAX_CLAIM_QTY");
        require(msg.value >= _priceextended.mul(_qty),"ARTHALL: Not enough fee");

        uint256 ran = random();
        amountPerWallets[msg.sender] += _qty;
        _mint(msg.sender, ran, _qty, "");
    }

    function _mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal override {
        require(
            supplies[uint8(id)] < MAX_NFT_SUPPLY,
            "ARTHALL: Suppy limit was hit"
        );

        supplies[uint8(id)] += amount;
        totalMinted += amount;
        super._mint(to, id, amount, data);
    }

    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function setUnrevealURI(string memory _uri) external onlyOwner() {
        unrevealURI = _uri;
    }

    function Reveal() public onlyOwner() {
        reveal = true;
    }

    function UnReveal() public onlyOwner() {
        reveal = false;
    }

    function _price() public view returns (uint256) {
        return _priceextended;
    }

    function setPrice(uint256 _priceextended_) external onlyOwner() {
        _priceextended = _priceextended_;
    }

    function pause() public onlyOwner {
        pauseMint = true;
    }

    function unPause() public onlyOwner {
        pauseMint = false;
    }
}