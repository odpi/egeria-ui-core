import {fetchTypes, ASSET_CATALOG_PATH, isStringLonger, QUERY_MIN_LENGTH, isArrayEmpty} from "@lfai/egeria-js-commons";
import {Loader, MultiSelect, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Search} from "tabler-icons-react";

export function MainSearch() {
  const navigate = useNavigate();

  const [typesData, setTypesData]: [any, any] = useState({
    isLoading: false,
    typesData: []
  });

  const [types, setTypes]: [any, any] = useState({value: [], isPristine: true});
  const [q, setQ]: [any, any] = useState({value: '', isPristine: true});

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      navigate(`${ASSET_CATALOG_PATH}?q=${q.value}&types=${types.value.join(',')}`)
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
                 value={types.value}
                 disabled={typesData.isLoading}
                 onChange={(value: any) => setTypes({value: [...value]})}
                 error={!types.isPristine && isArrayEmpty(types.value) ? 'At least one type has to be selected' : ''}
                 radius="sm"
                 size="xs"
                 placeholder="Type"
                 style={{width: '15%', marginRight: '1%'}}
                 rightSection={
                   typesData.isLoading ? <Loader size={22}/> : <></>
                 }/>

    <TextInput style={{width: '30%'}}
               icon={<Search size={18}/>}
               radius="sm"
               size="xs"
               value={q.value}
               disabled={typesData.isLoading}
               error={!q.isPristine && !isStringLonger(q.value, QUERY_MIN_LENGTH) ? 'Query must be at least ' + QUERY_MIN_LENGTH + ' characters' : ''}
               onKeyPress={handleKeyPress}
               onChange={(event: any) => setQ({value: event.currentTarget.value})}
               placeholder="Search terms"
               rightSectionWidth={42}/>
  </>
}