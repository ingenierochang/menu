import { useProductCategories } from "@/hooks/useProductsCategories";
import React, { useEffect, useRef, useState } from "react";

type CategoriesNavbarProps = {
  onSearch: (value: string) => void;
  categories: string[];
};

const CategoriesNavbar = ({ onSearch, categories }: CategoriesNavbarProps) => {
  const { productsCategories, loading } = useProductCategories();
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const initialOffsetTopRef = useRef<number | null>(null);

  console.log("categories", categories);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (initialOffsetTopRef.current === null) {
          initialOffsetTopRef.current = navbarRef.current.offsetTop;
        }

        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeSticky = scrollTop > initialOffsetTopRef.current;

        if (shouldBeSticky !== isSticky) {
          setIsSticky(shouldBeSticky);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchInput("");
      onSearch("");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchInput(term);
    onSearch(term);
  };

  if (loading || !productsCategories) return null;
  console.log("productsCategories", productsCategories);

  return (
    <>
      <div
        ref={navbarRef}
        style={{
          position: isSticky ? "fixed" : "relative",
          top: isSticky ? "0" : "auto",
          left: "0",
          right: "0",
          backgroundColor: "#f0f0f0",
          zIndex: 1000,
          display: "flex",
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <div style={{ padding: "10px", flexShrink: 0 }}>
          <i
            className={`bi ${isSearchActive ? "bi-x" : "bi-search"}`}
            style={{ cursor: "pointer" }}
            onClick={toggleSearch}
          ></i>
        </div>
        {isSearchActive ? (
          <div style={{ flexGrow: 1, padding: "5px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearch}
              style={{ width: "100%", padding: "5px" }}
              autoFocus
            />
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              flexGrow: 1,
              display: "flex",
            }}
          >
            {categories?.map((category, index) => (
              <a
                key={index}
                href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  padding: "10px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {category}
              </a>
            ))}
          </div>
        )}
      </div>
      {isSticky && (
        <div style={{ height: navbarRef.current?.offsetHeight ?? 0 }} />
      )}
    </>
  );
};

export default CategoriesNavbar;
