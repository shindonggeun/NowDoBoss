import { useEffect, useState } from 'react'
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

  // 상권 추천 페이지인지 확인하는 로직
  const [isRecommendPage, setIsRecommendPage] = useState(false)

  useEffect(() => {
    if (location.pathname === '/recommend') {
      setIsRecommendPage(true)
    } else {
      setIsRecommendPage(false)
    }
  }, [location])

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

  // // 지도 선택 시 선택된 값 바뀌었을 때 드롭다운에도 갱신
  // useEffect(() => {
  //   setSelectedGoo(selectedGoo.name)
  //   setSelectedDong(selectedDong.name)
  //   setSelectedCommercial(selectedCommercial.name)
  // }, [selectedGoo, selectedDong, selectedCommercial])
  return (
    <Place>
      {isRecommendPage ? (
        ''
      ) : (
        <Content>분석하고 싶은 상권을 선택해주세요.</Content>
      )}

      <SelectPlace>
        <Select
          placeholder={selectedGoo.name}
          indicator={<KeyboardArrowDown />}
          sx={{
            paddingRight: '5px',
            width: isRecommendPage ? '135px' : '100px',
            maxWidth: isRecommendPage ? '135px' : '108px',
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          {goosData.map(option => (
            <Option
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
          placeholder={selectedDong.name}
          indicator={<KeyboardArrowDown />}
          sx={{
            paddingRight: isRecommendPage ? '10px' : '5px',
            width: isRecommendPage ? '140px' : '100px',
            maxWidth: isRecommendPage ? '140px' : '110px',
            marginLeft: '5px',
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          {dongListData?.dataBody.map(option => (
            <Option
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

        {isRecommendPage ? (
          ''
        ) : (
          <Select
            placeholder={selectedCommercial.name}
            indicator={<KeyboardArrowDown />}
            sx={{
              paddingRight: '5px',
              minWidth: '140px',
              maxWidth: '150px',
              marginLeft: '5px',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            {commercialListData?.dataBody.map(option => (
              <Option
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

          // <Dropdown
          //   onClick={() => {
          //     if (selectedDong.name !== '행정동') {
          //       setDropdownCommercialOpen(!dropdownCommercialOpen)
          //     } else {
          //       console.log(' 동을 먼저 선택해주세요')
          //     }
          //   }}
          // >
          //   {/* 상권 드롭다운 */}
          //   <SelectedDistrict>{selectedCommercial.name}</SelectedDistrict>
          //   <ArrowIcon src={down_arrow} />
          // </Dropdown>
        )}
      </SelectPlace>
    </Place>
  )
}

export default ChoicePlace
