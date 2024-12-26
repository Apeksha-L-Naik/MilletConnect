import React from "react";

const Info = () => {
    

  const diseaseInfo = [
    {
      disease: "Diabetes",
      description:
        "Millets have a low glycemic index, making them ideal for managing blood sugar levels effectively.",
      milletBenefit: "Helps regulate blood sugar levels.",
    },
    {
      disease: "Obesity",
      description:
        "Rich in dietary fiber, millets promote a feeling of fullness and aid in weight management.",
      milletBenefit: "Supports weight loss and appetite control.",
    },
    {
      disease: "Heart Disease",
      description:
        "Millets contain magnesium and potassium, which help improve heart health and reduce cholesterol levels.",
      milletBenefit: "Supports cardiovascular health.",
    },
    {
      disease: "Anemia",
      description:
        "Millets are rich in iron and folic acid, helping to combat anemia and boost hemoglobin levels.",
      milletBenefit: "Improves blood health.",
    },
    {
      disease: "Digestive Disorders",
      description:
        "The high fiber content in millets helps promote better digestion and prevent constipation.",
      milletBenefit: "Enhances gut health.",
    },
    {
      disease: "Thyroid Disorders",
      description:
        "Certain millets like foxtail and finger millet are known to support thyroid function.",
      milletBenefit: "Balances thyroid hormones.",
    },
    {
      disease: "Celiac Disease",
      description:
        "Being gluten-free, millets are an excellent option for those with gluten intolerance or celiac disease.",
      milletBenefit: "Safe for gluten-free diets.",
    },
    {
      disease: "Hypertension",
      description:
        "Millets are low in sodium and rich in potassium, which help regulate blood pressure levels.",
      milletBenefit: "Helps maintain normal blood pressure.",
    },
    {
      disease: "Asthma",
      description:
        "Magnesium in millets can help reduce inflammation and improve lung function.",
      milletBenefit: "Eases respiratory conditions.",
    },
    {
      disease: "Skin Disorders",
      description:
        "Millets are rich in antioxidants, which help combat free radicals and improve skin health.",
      milletBenefit: "Promotes healthy and glowing skin.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-green-100 to-yellow-50 p-8">
      {/* Title */}
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#226c3e] text-center mb-10">
        🌾 Diseases and Millets 🌾
      </h1>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {diseaseInfo.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-xl p-6 transform transition-transform hover:scale-105 hover:shadow-2xl border-t-4 border-[#226c3e] flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="absolute -top-10 bg-[#fef9c3] p-4 rounded-full shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2913/2913465.png"
                alt={item.disease}
                className="w-16 h-16"
              />
            </div>

            {/* Disease Name */}
            <h2 className="text-xl font-bold text-[#226c3e] mt-10">
              {item.disease}
            </h2>

            {/* Disease Description */}
            <p className="text-gray-700 mt-4">{item.description}</p>

            {/* Millet Benefit */}
            <p className="bg-[#f6f8e8] text-[#226c3e] font-semibold p-3 rounded-lg mt-6 shadow-md">
              🌾 {item.milletBenefit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
