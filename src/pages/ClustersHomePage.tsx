import BannerFold from "@/components/banners/BannerFold";
import CategoriesFold from "@/components/categories/CategoriesFold";
import Header from "@/components/header/Header";
import React from "react";

const ClustersHomePage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-screen-md w-full">
        <div className="px-2 py-4 font-poppins flex flex-col gap-3 bg-gray-100 min-h-screen">
          <Header />
          <BannerFold />
          <CategoriesFold />
        </div>
      </div>
    </div>
  );
};

export default ClustersHomePage;
