import { supabase } from './supabase';

export async function hasRecentClick(ip, trackingLinkId, hours = 1) {
  try {
    const hoursAgo = new Date();
    hoursAgo.setHours(hoursAgo.getHours() - hours);

    const { data, error } = await supabase
      .from('clicks')
      .select('id')
      .eq('tracking_link_id', trackingLinkId)
      .eq('ip_address', ip)
      .gte('created_at', hoursAgo.toISOString())
      .limit(1);

    if (error) {
      console.error('Error checking recent clicks:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Error in hasRecentClick:', error);
    return false;
  }
}

export function isValidUserAgent(userAgent) {
  if (!userAgent || userAgent.trim() === '') {
    return false;
  }

  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java(?!script)/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(userAgent)) {
      return false;
    }
  }

  return true;
}

export async function hasSufficientBudget(campaignId, payout) {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('remaining_budget, is_active')
      .eq('id', campaignId)
      .single();

    if (error) {
      console.error('Error checking campaign budget:', error);
      return false;
    }

    if (!data || !data.is_active) {
      return false;
    }

    return parseFloat(data.remaining_budget) >= parseFloat(payout);
  } catch (error) {
    console.error('Error in hasSufficientBudget:', error);
    return false;
  }
}

export async function verifyClick(ip, userAgent, trackingLinkId, campaignId, payout) {
  const checks = {
    hasRecentClick: false,
    validUserAgent: true,
    sufficientBudget: true,
  };

  const recentClick = await hasRecentClick(ip, trackingLinkId, 1);
  if (recentClick) {
    checks.hasRecentClick = true;
    return {
      is_valid: false,
      reason: 'Rate limited: You have already clicked this link recently',
      checks,
    };
  }

  const validUA = isValidUserAgent(userAgent);
  if (!validUA) {
    checks.validUserAgent = false;
    return {
      is_valid: false,
      reason: 'Invalid user agent detected',
      checks,
    };
  }

  const budgetOk = await hasSufficientBudget(campaignId, payout);
  if (!budgetOk) {
    checks.sufficientBudget = false;
    return {
      is_valid: false,
      reason: 'Campaign has insufficient budget or is inactive',
      checks,
    };
  }

  return {
    is_valid: true,
    reason: 'Click verified successfully',
    checks,
  };
}
