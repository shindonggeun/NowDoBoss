import * as c from '@src/containers/main/MainStausContainerStyle'
import ContainerBox from '@src/common/ContainerBox'
import { useQuery } from '@tanstack/react-query'
import { DataBody } from '@src/types/StatusType'
import { fetchTopList } from '@src/api/statusApi'
import up from '@src/assets/top_arrow_up.svg'
import down from '@src/assets/top_arrow_down.svg'
import Profile from '@src/assets/MainProfileIcon.svg'

const MainCard2 = () => {
  const { data, isLoading } = useQuery<DataBody>({
    queryKey: ['StatusTopList'],
    queryFn: () => fetchTopList(),
  })
  // console.log(data!.dataBody.footTrafficTopTenList.slice(0, 5))
  return (
    <div>
      <c.SlideList>
        <c.Card>
          <c.HeaderText>유동인구</c.HeaderText>
          <c.TitleText>구별 상권 현황</c.TitleText>
          <c.AlignCenter>
            <c.Icon src={Profile} $width={20} />
            <c.SubTitleText>서울시 구별데이터</c.SubTitleText>
          </c.AlignCenter>
          <ContainerBox height={60} />
          {!isLoading && data && (
            <div>
              {data.dataBody.footTrafficTopTenList
                .slice(0, 5)
                .map((list, i) => {
                  const rate = list.totalRate.toFixed(2)
                  const isUp = list.totalRate >= 0

                  return (
                    <c.TopTenContainer key={i}>
                      <c.TopTenRank>{i + 1}.</c.TopTenRank>
                      <c.TopTenInfo>
                        <c.TopTenInfoName>
                          {list.districtCodeName}
                        </c.TopTenInfoName>
                        <c.TopTenInfoRate $isUp={isUp}>
                          {rate}%
                          {isUp ? (
                            <c.Icon $width={15} src={up} alt="up" />
                          ) : (
                            <c.Icon $width={15} src={down} alt="down" />
                          )}
                        </c.TopTenInfoRate>
                      </c.TopTenInfo>
                    </c.TopTenContainer>
                  )
                })}
            </div>
          )}
          <div />
        </c.Card>
      </c.SlideList>
    </div>
  )
}

export default MainCard2
