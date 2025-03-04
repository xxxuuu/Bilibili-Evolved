const removeBadScrollbar = () => {
  SpinQuery.select('.custom-scrollbar').then(it => it && it.classList.remove('custom-scrollbar'))
}
const unload = () => {
  document.body.classList.remove('dark')
  resources.removeStyle('darkStyleNavBar')
  resources.removeStyle('darkStyle')
  resources.removeStyle('darkStyleImportant')
}
const notSupported: (string | RegExp)[] = [
  '//member.bilibili.com/v2',
  '//member.bilibili.com/video/upload.html',
  '//member.bilibili.com/article-text/home',
  '//www.bilibili.com/audio/submit/',
  '//member.bilibili.com/studio/bs-editor/projects',
  '//www.bilibili.com/s/video/',
  '//member.bilibili.com/platform',
  '//live.bilibili.com/p/html/live-lottery/anchor-join.html',
  '//account.bilibili.com/subtitle/edit/#/editor',
  // 创作中心-收益管理-充电计划
  "/york/allowance-charge",
  // 创作中心-收益管理-悬赏计划
  "//cm.bilibili.com/quests/#/task",
]
const load = () => {
  if (settings.noDarkOnMember && notSupported.some(it => {
    if (typeof it === 'string') {
      return document.URL.replace(location.search, '').includes(it)
    } else {
      return it.test(document.URL.replace(location.search, ''))
    }
  })) {
    unload()
    return
  }
  document.body.classList.add('dark')
  window.localStorage.setItem('pbp_theme_v4', 'b')
  removeBadScrollbar()
  if (!settings.useDarkStyleAsUserStyle) {
    resources.applyImportantStyle('darkStyleNavBar')
    resources.applyStyle('darkStyle')
    resources.applyImportantStyle('darkStyleImportant')
  }
}
load()
addSettingsListener('useDarkStyleAsUserStyle', () => {
  unload()
  load()
})
export default {
  reload: load,
  unload: unload,
}
