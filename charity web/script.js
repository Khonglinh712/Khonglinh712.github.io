let userAddress = null;

// 🔴 Thay bằng địa chỉ ví MetaMask của bạn
const charityWallet = "0xTHAY_DIA_CHI_VI_CUA_BAN";

async function connectWallet() {
  if (!window.ethereum) {
    alert("Vui lòng cài MetaMask để sử dụng chức năng này");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    userAddress = accounts[0];
    document.getElementById("walletAddress").innerText =
      "Ví đã kết nối: " + userAddress;
  } catch (error) {
    console.error(error);
  }
}

async function donate() {
  if (!userAddress) {
    alert("Vui lòng kết nối ví trước khi donate");
    return;
  }

  try {
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: userAddress,
        to: charityWallet,
        value: "0x2386F26FC10000" // 0.01 ETH
      }]
    });
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("connectBtn").onclick = connectWallet;
document.getElementById("donateBtn").onclick = donate;

