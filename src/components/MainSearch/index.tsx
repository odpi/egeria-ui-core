import { fetchTypes, ASSET_CATALOG_PATH } from "@lfai/egeria-js-commons";
import { Loader, MultiSelect, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "tabler-icons-react";

export function MainSearch() {
  const navigate = useNavigate();

  const [typesData, setTypesData]: [any, any] = useState({
    isLoading: false,
    typesData: []
  });

  const [types, setTypes]: [any, any] = useState([]);
  const [q, setQ]: [any, any] = useState('');

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      navigate(`${ASSET_CATALOG_PATH}?q=${q}&types=${types.join(',')}`)
    }
  };

  useEffect(() => {
    setTypesData({...typesData, isLoading: true});

    const bringTypes = async () => {
      const rawTypesData = await fetchTypes();

      setTypesData({
        isLoading: false,
        typesData: [...rawTypesData]
      });
    };

    bringTypes();
  }, []);

  return <>
    <MultiSelect data={typesData.typesData}
                  value={types}
                  disabled={typesData.isLoading || typesData.typesData.length === 0}
                  onChange={(value: any) => setTypes([...value])}
                  radius="sm"
                  size="xs"
                  placeholder="Type"
                  style={{width:'15%', marginRight: '1%'}}
                  rightSection={
                    typesData.isLoading ? <Loader size={22} /> : <></>
                  } />

    <TextInput style={{width:'30%'}}
                icon={<Search size={18} />}
                radius="sm"
                size="xs"
                value={q}
                disabled={typesData.isLoading || typesData.typesData.length === 0}
                onKeyPress={handleKeyPress}
                onChange={(event: any) => setQ(event.currentTarget.value)}
                placeholder="Search terms"
                rightSectionWidth={42} />
  </>
}