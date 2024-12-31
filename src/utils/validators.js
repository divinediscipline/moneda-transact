export const required = (value) => !!value || 'This field is required'

export const minValue = (min) => (value) => 
  !value || Number(value) >= min || `Value must be greater than ${min}`

export const maxFileSize = (file, maxSize) => {
  if (!file) return true
  return file.size <= maxSize * 1024 * 1024 || `File size must be less than ${maxSize}MB`
}

export const allowedFileTypes = (file, types) => {
  if (!file) return true
  const extension = file.name.split('.').pop().toLowerCase()
  return types.includes(extension) || `Allowed file types: ${types.join(', ')}`
}

export const getTopThreeSocSummaries = (socSummary) => {
  if (!socSummary || !Array.isArray(socSummary)) {
    return []; // Return empty array for invalid input
  }

  // Convert value_usd to numbers and handle potential errors
  const parsedSummaries = socSummary.map(item => {
    const valueUsd = parseFloat(item.value_usd);
    return {
      name: item.name,
      value_usd: isNaN(valueUsd) ? 0 : valueUsd,
      original_value_usd: item.value_usd
    };
  });

  // Sort by value_usd in descending order
  parsedSummaries.sort((a, b) => b.value_usd - a.value_usd);

  // Return the top three, keeping original string value
  return parsedSummaries.slice(0, 3).map(({name, original_value_usd}) => ({name, value_usd: original_value_usd}));
}

export const getTransactionTypeCounts = (transaction_type_summary, sequence) => {
  const counts = sequence.map(type => {
    const found = transaction_type_summary.find(item => item.transaction_type === type.toLowerCase());
    return found ? parseInt(found.count) : 0; 
  });
  return counts;
}