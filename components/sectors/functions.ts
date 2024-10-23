export const fetchSectors = async (setSectors:any, setError:any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setSectors(data); 
      } else {
        setError("No se pudieron obtener los sectores");
      }
    } catch (e) {
      setError("No se logró obtener la lista de sectores");
      console.error(e);
    }
  };


  // Agrupar los sectores por categorías
export const groupSectorsByCategory = (sectors: any) => {
  return sectors.reduce((acc: any, sector: any) => {
    const { sector: category } = sector;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(sector);
    return acc;
  }, {});
};

  