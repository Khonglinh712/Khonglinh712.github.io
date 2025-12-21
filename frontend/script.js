let userAddress = null;

// ⚠️ THAY bằng ví nhận từ thiện của bạn
const charityWallet = "0xTHAY_DIA_CHI_VI_CUA_BAN"; // Thay bằng địa chỉ thực

async function connectWallet() {
    if (!window.ethereum) {
        alert("Vui lòng cài MetaMask để kết nối ví.");
        return;
    }

    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        document.getElementById("walletAddress").innerText = `Địa chỉ: ${userAddress}`;
        document.getElementById("connectBtn").innerText = "Đã kết nối";
        document.getElementById("connectBtn").disabled = true;
        alert("Ví đã kết nối thành công!");
    } catch (err) {
        console.error(err);
        alert("Kết nối ví thất bại. Vui lòng thử lại.");
    }
}

async function donate() {
    if (!userAddress) {
        alert("Bạn cần kết nối ví trước.");
        return;
    }

    const amount = parseFloat(document.getElementById("amount").value);
    if (!amount || amount <= 0) {
        alert("Nhập số ETH hợp lệ (> 0).");
        return;
    }

    // Hiển thị trạng thái tải
    const donateBtn = document.getElementById("donateBtn");
    donateBtn.innerText = "Đang xử lý...";
    donateBtn.disabled = true;

    try {
        const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: userAddress,
                to: charityWallet,
                value: (amount * 1e18).toString(16) // Chuyển ETH sang Wei
            }]
        });

        alert(`Quyên góp thành công! Hash giao dịch: ${txHash}`);
        
        // Cập nhật bảng minh bạch (giả sử có bảng với ID "donationTable")
        const table = document.getElementById("donationTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = userAddress;
        newRow.insertCell(1).innerText = `${amount} ETH`;
        newRow.insertCell(2).innerText = "Thành công";

        // Reset form
        document.getElementById("amount").value = "";
    } catch (err) {
        console.error(err);
        alert("Giao dịch bị huỷ hoặc thất bại. Vui lòng thử lại.");
    } finally {
        // Reset nút
        donateBtn.innerText = "Quyên góp";
        donateBtn.disabled = false;
    }
}

// Thêm event listener khi trang tải
window.addEventListener('load', () => {
    // Kiểm tra nếu ví đã kết nối
    if (window.ethereum && window.ethereum.selectedAddress) {
        userAddress = window.ethereum.selectedAddress;
        document.getElementById("walletAddress").innerText = `Địa chỉ: ${userAddress}`;
        document.getElementById("connectBtn").innerText = "Đã kết nối";
        document.getElementById("connectBtn").disabled = true;
    }
});