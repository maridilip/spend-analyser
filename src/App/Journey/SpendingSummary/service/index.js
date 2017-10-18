import ServiceCaller from '../../../Services/stub-service'

export const getSpendingSummary = (oprId) => {
    const config = {
        stubUrl: '/data/spend/spendAnalyse.json',
        url: '',
        isStub: true,
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        params: {}
    }
    return ServiceCaller.invoke(config).then(res => (res.data))
}

