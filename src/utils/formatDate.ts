export const useDate = () => {
    const formatIsoLocalToBr = (dateFormatIsoLocal: string) => {
        const [year, month, day, time] = dateFormatIsoLocal.replace('T', '-').split('-')
        return `${day}/${month}/${year} ${time}`;
    }

    const formatIsoUtcToBr = (dateFormatIsoUtc: string) => {
        const [year, month, day, time] = dateFormatIsoUtc.slice(0, -4).replace('T', '-').split('-')
        return `${day}/${month}/${year} ${time}`;
    }

    return {
        formatIsoLocalToBr,
        formatIsoUtcToBr
    }
}