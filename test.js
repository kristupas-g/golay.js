function t(input, expected) 
{
    input = input.split('').map(Number)
    expected = expected.split('').map(Number)
    const decoded = GolayCode.decode(input).slice(0, 12)
    const result = decoded.toString() === expected.toString()
    if (!result) 
    {
        console.log('Expected:', expected.join(''))
        console.log('Got:     ', decoded.join(''))
    }
}

t(
    '001101100101111100011100',
    '001101100001'
)

t(
    '011001010110101101100100',
    '011001010110'
)

t(
    '000101100001100000011011',
    '000101100001'
)