const ACCOUNTS = {
  sportschew: {
    desktop: 'sportschew-sc',
    mobile: 'redgobo-sportschew-us-m-sc'
  },
  blitzlift: {
    desktop: 'blitzlift-sc',
    mobile: 'ifroppit-blitzlift2-sc'
  },
  dogsome: 'ifroppit-dogsome-sc',
  insidetonight: {
    desktop: 'redgobo-insidetonightcom-sc',
    mobile: 'redgobo-insidetonightcom-us-m-sc'
  },
  hopeshared: 'ifroppit-hopeshared-sc',
  popularhealth: {
    desktop: 'redgobo-popularhealth-sc',
    mobile: 'redgobo-popularhealth-us-m-sc'
  }
  // search: {
  //   desktop: 'redgobo-search-desktop-sc',
  //   mobile: 'redgobo-search-mobile-sc'
  // }
}

const getAccount = (site, device) => {
  // return account by site & device, or just by site if device doesn't exist
  return ACCOUNTS[site.toLowerCase()][device.toLowerCase()] || ACCOUNTS[site.toLowerCase()]
}

module.exports = {
  ACCOUNTS,
  getAccount
}