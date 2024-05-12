import { MemberInfoType } from '@src/types/UserType'

export type TitlePropsType = {
  title: string
}

export type ProfilePropsType = {
  MemberInfoData: MemberInfoType
}

export type TabsType = {
  label: string
  path: string
}

export type TabBarPropsType = {
  tabs: TabsType[]
}

export type UpdateMemberInfoDataType = {
  nickname: string
  profileImage: string
}

export type ChangeMemberPasswordDataType = {
  nowPassword: string
  changePassword: string
  changePasswordCheck: string
}
