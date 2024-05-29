import { useEffect } from 'react'
import styled from 'styled-components'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { useQuery } from '@tanstack/react-query'
import { fetchAdministrationList, fetchDongList } from '@src/api/mapApi'
import { useLocation } from 'react-router-dom'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

const Place = styled.div`
  margin: 10px 10px;
  text-align: left;
`

const Content = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
`

const SelectPlace = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  margin-top: 10px;
`

const ChoicePlace = () => {
  const location = useLocation()

  // store에 저장된 구 데이터와 선택한 구, 동, 상권 값 가져올 store
  const {
    goosData,
    selectedGoo,
    selectedDong,
    selectedCommercial,
    setSelectedGoo,
    setSelectedDong,
    setSelectedCommercial,
    setSaveDongList,
    setSaveCommercialList,
  } = useSelectPlaceStore()

  const setSelectedServiceType = analysisStore(
    state => state.setSelectedServiceType,
  )
  const setSelectedService = analysisStore(state => state.setSelectedService)

  // 구 선택 시 동 목록 조회하는 useQuery
  const { data: dongListData } = useQuery({
    queryKey: ['fetchDongList', selectedGoo],
    queryFn: () => fetchDongList(selectedGoo.code),
  })

  // 동 선택 시 상권 목록 조회하는 useQuery
  const { data: commercialListData } = useQuery({
    queryKey: ['fetchAdministrationList', selectedDong],
    queryFn: () => fetchAdministrationList(selectedDong.code),
  })

  // 동, 상권 목록 불러오면 store에 저장해서 map에서 재사용할 수 있도록 설정
  useEffect(() => {
    if (dongListData) {
      setSaveDongList(dongListData?.dataBody)
    }
    if (commercialListData) {
      setSaveCommercialList(commercialListData?.dataBody)
    }
  }, [commercialListData, dongListData, setSaveDongList, setSaveCommercialList])

  return (
    <Place>
      {location.pathname === '/recommend' ? (
        ''
      ) : (
        <Content>분석하고 싶은 상권을 선택해주세요.</Content>
      )}

      <SelectPlace>
        <Select
          placeholder={selectedGoo.name}
          value={selectedGoo.name}
          indicator={<KeyboardArrowDown />}
          sx={{
            paddingRight: '5px',
            width: location.pathname === '/recommend' ? '160px' : '94px',
            maxWidth: location.pathname === '/recommend' ? '160px' : '100px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '14px',
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
          }}
        >
          {goosData.map(option => (
            <Option
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
              }}
              value={option.gooCode}
              key={option.gooCode}
              onClick={() => {
                // store에 선택 값 저장
                setSelectedGoo({
                  name: option.gooName,
                  code: option.gooCode,
                })
                // 하위 선택값 초기화
                setSelectedDong({
                  name: '행정동',
                  code: 0,
                })
                setSelectedCommercial({
                  name: '상권',
                  code: 0,
                })
              }}
            >
              {option.gooName}
            </Option>
          ))}
        </Select>
        {/* 행정동 드롭다운 */}

        <Select
          disabled={selectedGoo.name === '자치구'}
          placeholder={selectedDong.name}
          value={selectedDong.name}
          indicator={<KeyboardArrowDown />}
          sx={{
            paddingRight: location.pathname === '/recommend' ? '10px' : '5px',
            width: location.pathname === '/recommend' ? '165px' : '100px',
            maxWidth: location.pathname === '/recommend' ? '165px' : '110px',
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '14px',
            marginLeft: '5px',
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
          }}
        >
          {dongListData?.dataBody.map(option => (
            <Option
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
              }}
              value={option.administrationCode}
              key={option.administrationCode}
              onClick={() => {
                // store에 선택 값 저장
                setSelectedDong({
                  name: option.administrationCodeName,
                  code: option.administrationCode,
                })
                // 하위 선택값 초기화
                setSelectedCommercial({
                  name: '상권',
                  code: 0,
                })
              }}
            >
              {option.administrationCodeName}
            </Option>
          ))}
        </Select>
        {location.pathname === '/recommend' ? (
          ''
        ) : (
          <Select
            disabled={
              selectedGoo.name === '자치구' || selectedDong.name === '행정동'
            }
            placeholder={selectedCommercial.name}
            value={selectedCommercial.name}
            indicator={<KeyboardArrowDown />}
            sx={{
              paddingRight: '5px',
              minWidth: '135px',
              maxWidth: '135px',
              marginLeft: '5px',
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '14px',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            {commercialListData?.dataBody.map(option => (
              <Option
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                }}
                value={option.commercialCode}
                key={option.commercialCode}
                onClick={() => {
                  // store에 선택 값 저장
                  setSelectedCommercial({
                    name: option.commercialCodeName,
                    code: option.commercialCode,
                  })
                  // 업종 선택값 초기화
                  setSelectedServiceType('')
                  setSelectedService({
                    serviceCode: '',
                    serviceCodeName: '',
                    serviceType: '',
                  })
                }}
              >
                {option.commercialCodeName}
              </Option>
            ))}
          </Select>
        )}
      </SelectPlace>
    </Place>
  )
}

export default ChoicePlace
