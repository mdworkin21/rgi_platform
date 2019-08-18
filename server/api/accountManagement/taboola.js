const TABOOLA_ACCOUNTS = {
  sportschew: {
    desktop: 'sportschew-sc',
    mobile: 'redgobo-sportschew-us-m-sc'
  },
  blitzlift: {
    desktop: 'blitzlift-sc',
    mobile: 'ifroppit-blitzlift2-sc'
  },
  dogsome: 'ifroppit-dogsome-sc',
  insidetonight: 'redgobo-insidetonightcom-sc',
  hopeshared: 'ifroppit-hopeshared-sc',
  popularhealth: 'redgobo-popularhealth-sc'
}

const getAccount = (site, device) => {
  // return account by site & device, or just by site if device doesn't exist
  return TABOOLA_ACCOUNTS[site.toLowerCase()][device.toLowerCase()] || TABOOLA_ACCOUNTS[site.toLowerCase()]
}