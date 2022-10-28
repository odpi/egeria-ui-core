import { fetchTypes } from "@lfai/egeria-js-commons";
import { Loader, MultiSelect, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "tabler-icons-react";

interface Props {
  apiUrl?: string;
}

export function MainSearch(props: Props) {
  const navigate = useNavigate();
  const { apiUrl } = props;

  const [typesData, setTypesData]: [any, any] = useState({
    isLoading: false,
    typesData: []
  });

  const [types, setTypes]: [any, any] = useState([]);
  const [q, setQ]: [any, any] = useState('');

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      navigate(`/assets/catalog?q=${q}&types=${types.join(',')}`)
    }
  };

  useEffect(() => {
    setTypesData({...typesData, isLoading: true});

    const bringTypes = async () => {
      const rawTypesData = await fetchTypes(apiUrl);

      setTypesData({
        isLoading: false,
        typesData: [...rawTypesData]
      });
    };

    bringTypes();
  }, [apiUrl]);

  return <>
    <MultiSelect data={typesData.typesData}
                  value={types}
                  disabled={typesData.isLoading}
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
                disabled={typesData.isLoading}
                onKeyPress={handleKeyPress}
                onChange={(event: any) => setQ(event.currentTarget.value)}
                placeholder="Search terms"
                rightSectionWidth={42} />
  </>
}