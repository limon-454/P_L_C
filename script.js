const districts = [
    { name: "ঢাকা", area: "১,৪৬৩ বর্গকিমি", population: "৯১.৫৭ লক্ষ" },
    { name: "চট্টগ্রাম", area: "৫,২৮৩ বর্গকিমি", population: "৭৬.৭ লক্ষ" },
    { name: "খুলনা", area: "৪,৩৯৪ বর্গকিমি", population: "৩১.৮ লক্ষ" },
    { name: "রাজশাহী", area: "২,৪০৭ বর্গকিমি", population: "২৫.৫ লক্ষ" },
    { name: "সিলেট", area: "৩,৪৯০ বর্গকিমি", population: "৩৪.৩ লক্ষ" },
    { name: "বরিশাল", area: "২,৭৭২ বর্গকিমি", population: "২৪.৭ লক্ষ" },
    { name: "রংপুর", area: "২,৩২০ বর্গকিমি", population: "৩০.২ লক্ষ" },
    { name: "ময়মনসিংহ", area: "৪,৩৬৩ বর্গকিমি", population: "৩১.৯ লক্ষ" }
];

const districtsDiv = document.getElementById("districts");

function displayDistricts() {
    districtsDiv.innerHTML = "";
    districts.forEach(district => {
        const districtCard = document.createElement("div");
        districtCard.className = "card";
        districtCard.innerHTML = `<h3>${district.name}</h3>
                                  <p><strong>আয়তন:</strong> ${district.area}</p>
                                  <p><strong>জনসংখ্যা:</strong> ${district.population}</p>`;
        districtsDiv.appendChild(districtCard);
    });
}

// **সার্চ ফাংশন**
function searchDistrict() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const filteredDistricts = districts.filter(d => d.name.toLowerCase().includes(query));
    
    districtsDiv.innerHTML = "";
    filteredDistricts.forEach(district => {
        const districtCard = document.createElement("div");
        districtCard.className = "card";
        districtCard.innerHTML = `<h3>${district.name}</h3>
                                  <p><strong>আয়তন:</strong> ${district.area}</p>
                                  <p><strong>জনসংখ্যা:</strong> ${district.population}</p>`;
        districtsDiv.appendChild(districtCard);
    });
}

// **ওয়েবসাইট লোড হলে জেলার তথ্য দেখানো হবে**
document.addEventListener("DOMContentLoaded", displayDistricts);
