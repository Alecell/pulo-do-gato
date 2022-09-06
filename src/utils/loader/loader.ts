export const loader = async (assets: Promise<void>[]) => {
  //  show loading screen
  await Promise.all(assets)
  //  hide load screen
}
