import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const SmartOutfitApp());
}

class SmartOutfitApp extends StatelessWidget {
  const SmartOutfitApp({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFF2F6F73),
      brightness: Brightness.light,
    );

    return MaterialApp(
      title: 'Smart Outfit',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: colorScheme,
        scaffoldBackgroundColor: const Color(0xFFF7F3EA),
        appBarTheme: const AppBarTheme(
          centerTitle: false,
          elevation: 0,
          backgroundColor: Color(0xFFF7F3EA),
          foregroundColor: Color(0xFF1F2421),
        ),
        cardTheme: CardThemeData(
          color: const Color(0xFFFFFDF8),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
            side: const BorderSide(color: Color(0xFFDED7CA)),
          ),
        ),
      ),
      home: const ClosetScreen(),
    );
  }
}

class ClothingItem {
  const ClothingItem({
    required this.id,
    required this.title,
    required this.category,
    required this.color,
    required this.season,
    required this.occasion,
    required this.imageUrl,
    required this.material,
    required this.brand,
    required this.price,
    required this.sizeLabel,
    required this.purchaseDate,
    required this.createdAt,
    required this.lastWornAt,
    required this.wearCount,
    required this.outfitAdoptionCount,
    required this.favoriteScore,
    required this.specialCare,
    required this.specialTag,
    required this.careInstructions,
    required this.specialMeaning,
    required this.recyclingNotes,
    required this.unwornOverOneYear,
  });

  factory ClothingItem.fromJson(Map<String, dynamic> json) {
    final category = (json['category'] as String?)?.trim() ?? '';
    return ClothingItem(
      id: json['id'] as int,
      title: ((json['name'] as String?)?.trim().isNotEmpty ?? false)
          ? (json['name'] as String).trim()
          : category,
      category: category,
      color: (json['color'] as String?)?.trim() ?? '',
      season: (json['season'] as String?)?.trim() ?? '',
      occasion: (json['occasion'] as String?)?.trim() ?? '',
      imageUrl: (json['imageUrl'] as String?)?.trim(),
      material: (json['material'] as String?)?.trim() ?? '',
      brand: (json['brand'] as String?)?.trim() ?? '',
      price: (json['price'] as num?)?.toDouble(),
      sizeLabel: (json['sizeLabel'] as String?)?.trim() ?? '',
      purchaseDate: (json['purchaseDate'] as String?)?.trim() ?? '',
      createdAt: (json['createdAt'] as String?)?.trim() ?? '',
      lastWornAt: (json['lastWornAt'] as String?)?.trim() ?? '',
      wearCount: json['wearCount'] as int? ?? 0,
      outfitAdoptionCount: json['outfitAdoptionCount'] as int? ?? 0,
      favoriteScore: json['favoriteScore'] as int? ?? 0,
      specialCare: json['specialCare'] as bool? ?? false,
      specialTag: json['specialTag'] as bool? ?? false,
      careInstructions: (json['careInstructions'] as String?)?.trim() ?? '',
      specialMeaning: (json['specialMeaning'] as String?)?.trim() ?? '',
      recyclingNotes: (json['recyclingNotes'] as String?)?.trim() ?? '',
      unwornOverOneYear: json['unwornOverOneYear'] as bool? ?? false,
    );
  }

  final int id;
  final String title;
  final String category;
  final String color;
  final String season;
  final String occasion;
  final String? imageUrl;
  final String material;
  final String brand;
  final double? price;
  final String sizeLabel;
  final String purchaseDate;
  final String createdAt;
  final String lastWornAt;
  final int wearCount;
  final int outfitAdoptionCount;
  final int favoriteScore;
  final bool specialCare;
  final bool specialTag;
  final String careInstructions;
  final String specialMeaning;
  final String recyclingNotes;
  final bool unwornOverOneYear;
}

class ClosetScreen extends StatefulWidget {
  const ClosetScreen({super.key});

  @override
  State<ClosetScreen> createState() => _ClosetScreenState();
}

class _ClosetScreenState extends State<ClosetScreen> {
  static const defaultApiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:8080',
  );

  final TextEditingController _apiController =
      TextEditingController(text: defaultApiBaseUrl);
  List<ClothingItem> _items = const [];
  bool _isLoading = true;
  String? _error;
  int _tabIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadClothes();
  }

  @override
  void dispose() {
    _apiController.dispose();
    super.dispose();
  }

  Uri _apiUri(String path) {
    final base = _apiController.text.trim().replaceAll(RegExp(r'/$'), '');
    return Uri.parse('$base$path');
  }

  Uri? _imageUri(String? path) {
    if (path == null || path.isEmpty) {
      return null;
    }

    final parsed = Uri.tryParse(path);
    if (parsed != null && parsed.hasScheme) {
      return parsed;
    }
    return _apiUri(path.startsWith('/') ? path : '/$path');
  }

  Future<void> _openClothingDetail(ClothingItem item) async {
    await Navigator.of(context).push<void>(
      MaterialPageRoute(
        builder: (context) => ClothingDetailScreen(
          item: item,
          imageUri: _imageUri(item.imageUrl),
          apiBaseUrl: _apiController.text,
        ),
      ),
    );
    if (mounted) {
      _loadClothes();
    }
  }

  Future<void> _loadClothes() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final response = await http.get(_apiUri('/clothes'));
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw Exception('HTTP ${response.statusCode}');
      }

      final data = jsonDecode(utf8.decode(response.bodyBytes)) as List<dynamic>;
      final items = data
          .cast<Map<String, dynamic>>()
          .map(ClothingItem.fromJson)
          .toList(growable: false);

      if (!mounted) {
        return;
      }
      setState(() {
        _items = items;
        _isLoading = false;
      });
    } catch (_) {
      if (!mounted) {
        return;
      }
      setState(() {
        _isLoading = false;
        _error = 'Cannot connect to backend';
      });
    }
  }

  void _showApiSettings() {
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            bottom: MediaQuery.viewInsetsOf(context).bottom + 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Backend URL', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 12),
              TextField(
                controller: _apiController,
                keyboardType: TextInputType.url,
                textInputAction: TextInputAction.done,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'http://192.168.1.10:8080',
                ),
                onSubmitted: (_) {
                  Navigator.pop(context);
                  _loadClothes();
                },
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: () {
                    Navigator.pop(context);
                    _loadClothes();
                  },
                  child: const Text('Save and Refresh'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final titles = ['My Wardrobe', 'Outfit Planner', 'Fitting Mirror', 'Tools', 'Wellness'];
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'SMART OUTFIT',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w800,
                color: Color(0xFF1F5559),
              ),
            ),
            Text(
              titles[_tabIndex],
              style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w800),
            ),
          ],
        ),
        toolbarHeight: 88,
        actions: [
          IconButton(
            onPressed: _loadClothes,
            icon: const Icon(CupertinoIcons.arrow_clockwise),
            tooltip: 'Refresh',
          ),
          IconButton(
            onPressed: _showApiSettings,
            icon: const Icon(CupertinoIcons.slider_horizontal_3),
            tooltip: 'API Settings',
          ),
        ],
      ),
      body: _tabIndex == 0 ? SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadClothes,
          child: CustomScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            slivers: [
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
                sliver: SliverToBoxAdapter(
                  child: _StatsStrip(items: _items),
                ),
              ),
              if (_isLoading)
                const SliverFillRemaining(
                  child: Center(child: CircularProgressIndicator()),
                )
              else if (_error != null)
                SliverFillRemaining(
                  hasScrollBody: false,
                  child: _MessageState(
                    icon: CupertinoIcons.wifi_exclamationmark,
                    title: _error!,
                    detail: 'Confirm Spring Boot is running and the phone is on the same network as the computer.',
                    actionLabel: 'Retry',
                    onAction: _loadClothes,
                  ),
                )
              else if (_items.isEmpty)
                SliverFillRemaining(
                  hasScrollBody: false,
                  child: _MessageState(
                    icon: CupertinoIcons.cube_box,
                    title: 'Wardrobe is Empty',
                    detail: 'Next steps include camera capture, classification, and care reminders.',
                    actionLabel: 'Refresh',
                    onAction: _loadClothes,
                  ),
                )
              else
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                  sliver: SliverGrid.builder(
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                      childAspectRatio: 0.68,
                    ),
                    itemCount: _items.length,
                    itemBuilder: (context, index) => _ClothingCard(
                      item: _items[index],
                      imageUri: _imageUri(_items[index].imageUrl),
                      onTap: () => _openClothingDetail(_items[index]),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ) : _FeatureBody(index: _tabIndex),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tabIndex,
        onDestinationSelected: (index) => setState(() => _tabIndex = index),
        destinations: const [
          NavigationDestination(
            icon: Icon(CupertinoIcons.square_grid_2x2),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(CupertinoIcons.sparkles),
            label: 'Outfits',
          ),
          NavigationDestination(
            icon: Icon(CupertinoIcons.person_crop_rectangle),
            label: 'Try-on',
          ),
          NavigationDestination(
            icon: Icon(CupertinoIcons.wand_stars),
            label: 'Tools',
          ),
          NavigationDestination(
            icon: Icon(CupertinoIcons.heart),
            label: 'Wellness',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(CupertinoIcons.camera),
        label: const Text('Add'),
      ),
    );
  }
}

class _StatsStrip extends StatelessWidget {
  const _StatsStrip({required this.items});

  final List<ClothingItem> items;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        _StatCard(label: 'All', value: items.length),
        const SizedBox(width: 10),
        _StatCard(
          label: 'Special Care',
          value: items.where((item) => item.specialCare).length,
        ),
        const SizedBox(width: 10),
        _StatCard(
          label: 'Unworn 1Y',
          value: items.where((item) => item.unwornOverOneYear).length,
        ),
      ],
    );
  }
}

class _FeatureBody extends StatelessWidget {
  const _FeatureBody({required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    final icon = switch (index) {
      1 => CupertinoIcons.sparkles,
      2 => CupertinoIcons.person_crop_rectangle,
      3 => CupertinoIcons.wand_stars,
      _ => CupertinoIcons.heart,
    };
    final title = switch (index) {
      1 => 'Outfit Planner',
      2 => 'My Fitting Mirror',
      3 => 'Tools',
      _ => 'Wellness',
    };
    final detail = switch (index) {
      1 => 'Generate outfits by occasion, season, temperature, and color preference.',
      2 => 'Create a private avatar to preview colors, proportions, and full outfit styling from your wardrobe.',
      3 => 'Outfit Calendar、Saved Outfits、Travel Packing、Shopping Decisions、Authorization Center and privacy management。',
      _ => 'Weight, period, ovulation reminders, mood, and important events.',
    };

    return SafeArea(
      child: _MessageState(
        icon: icon,
        title: title,
        detail: '$detail\nFlutter page structure is synced; next step is connecting the corresponding APIs.',
        actionLabel: 'Continue',
        onAction: () {},
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.label, required this.value});

  final String label;
  final int value;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '$value',
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                label,
                style: const TextStyle(
                  color: Color(0xFF6D756F),
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ClothingCard extends StatelessWidget {
  const _ClothingCard({
    required this.item,
    required this.imageUri,
    required this.onTap,
  });

  final ClothingItem item;
  final Uri? imageUri;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Container(
                width: double.infinity,
                color: const Color(0xFFDFE8DF),
                child: imageUri == null
                    ? Center(
                        child: Text(
                          item.category.isEmpty ? 'Item' : item.category,
                          style: const TextStyle(
                            color: Color(0xFF1F5559),
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      )
                    : Image.network(
                        imageUri.toString(),
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return const Icon(CupertinoIcons.photo, size: 36);
                        },
                      ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.title.isEmpty ? 'Unnamed Item' : item.title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontWeight: FontWeight.w900),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: [
                      _Pill(text: _labelOf(item.season)),
                      _Pill(text: _labelOf(item.occasion)),
                      _Pill(text: '${item.wearCount} times'),
                      _Pill(text: 'Favorite Score ${item.favoriteScore}'),
                      if (item.brand.isNotEmpty) _Pill(text: item.brand),
                      if (item.sizeLabel.isNotEmpty)
                        _Pill(text: item.sizeLabel),
                      if (item.specialCare)
                        const _Pill(text: 'Care', warning: true),
                      if (item.specialTag)
                        const _Pill(text: 'Meaningful', warning: true),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ClothingDetailScreen extends StatelessWidget {
  const ClothingDetailScreen({
    super.key,
    required this.item,
    required this.imageUri,
    required this.apiBaseUrl,
  });

  final ClothingItem item;
  final Uri? imageUri;
  final String apiBaseUrl;

  Uri _apiUri(String path) {
    final base = apiBaseUrl.trim().replaceAll(RegExp(r'/$'), '');
    return Uri.parse('$base$path');
  }

  Future<void> _recordWear(BuildContext context) async {
    try {
      final response = await http.patch(
        _apiUri('/clothes/wear?id=${item.id}'),
      );
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw Exception('HTTP ${response.statusCode}');
      }
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Marked as worn today')),
        );
      }
    } catch (_) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Record failed. Confirm backend connection.')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final favoriteValue = (item.favoriteScore.clamp(0, 100)) / 100;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Item Details'),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(CupertinoIcons.pencil),
            tooltip: 'Edit',
          ),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 28),
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(18),
              child: AspectRatio(
                aspectRatio: 4 / 5,
                child: Container(
                  color: const Color(0xFFDFE8DF),
                  child: imageUri == null
                      ? Center(
                          child: Text(
                            item.category.isEmpty ? 'Item' : item.category,
                            style: const TextStyle(
                              color: Color(0xFF1F5559),
                              fontSize: 24,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        )
                      : Image.network(
                          imageUri.toString(),
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return const Icon(CupertinoIcons.photo, size: 48);
                          },
                        ),
                ),
              ),
            ),
            const SizedBox(height: 18),
            Text(
              item.title.isEmpty ? 'Unnamed Item' : item.title,
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                _Pill(text: _labelOf(item.season)),
                _Pill(text: _labelOf(item.occasion)),
                if (item.specialCare) const _Pill(text: 'Special Care', warning: true),
                if (item.specialTag) const _Pill(text: 'Meaningful', warning: true),
                if (item.unwornOverOneYear)
                  const _Pill(text: 'Unworn over 1 year', warning: true),
              ],
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          _favoriteLevel(item.favoriteScore),
                          style: const TextStyle(
                            color: Color(0xFF1F5559),
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        Text(
                          'Favorite Score ${item.favoriteScore}/100',
                          style: const TextStyle(
                            color: Color(0xFF6D756F),
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    LinearProgressIndicator(value: favoriteValue),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),
            _DetailGrid(
              children: [
                _DetailTile(label: 'Category', value: item.category),
                _DetailTile(label: 'Color', value: item.color),
                _DetailTile(label: 'Brand', value: item.brand),
                _DetailTile(label: 'Size', value: item.sizeLabel),
                _DetailTile(label: 'Price', value: _formatMoney(item.price)),
                _DetailTile(label: 'Material', value: item.material),
                _DetailTile(label: 'Wear Count', value: '${item.wearCount} times'),
                _DetailTile(
                  label: 'Outfit Adoption',
                  value: '${item.outfitAdoptionCount} times',
                ),
                _DetailTile(label: 'Purchase Date', value: item.purchaseDate),
                _DetailTile(label: 'Added Date', value: _formatDate(item.createdAt)),
                _DetailTile(label: 'Last Worn', value: _formatDate(item.lastWornAt)),
              ],
            ),
            if (item.careInstructions.isNotEmpty)
              _DetailNote(title: 'Care Instructions', body: item.careInstructions),
            if (item.specialMeaning.isNotEmpty)
              _DetailNote(title: 'Special Meaning', body: item.specialMeaning),
            if (item.recyclingNotes.isNotEmpty)
              _DetailNote(title: 'Recycling Notes', body: item.recyclingNotes),
            const SizedBox(height: 14),
            FilledButton.icon(
              onPressed: () => _recordWear(context),
              icon: const Icon(CupertinoIcons.checkmark_circle),
              label: const Text('Worn Today'),
            ),
            const SizedBox(height: 10),
            OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(CupertinoIcons.pencil),
              label: const Text('EditItem'),
            ),
          ],
        ),
      ),
    );
  }
}

class _DetailGrid extends StatelessWidget {
  const _DetailGrid({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      childAspectRatio: 1.75,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: children,
    );
  }
}

class _DetailTile extends StatelessWidget {
  const _DetailTile({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final displayValue = value.trim().isEmpty ? 'Not Set' : value.trim();
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              label,
              style: const TextStyle(
                color: Color(0xFF6D756F),
                fontSize: 12,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 5),
            Text(
              displayValue,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontWeight: FontWeight.w900),
            ),
          ],
        ),
      ),
    );
  }
}

class _DetailNote extends StatelessWidget {
  const _DetailNote({required this.title, required this.body});

  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 8),
            Text(
              body,
              style: const TextStyle(color: Color(0xFF6D756F), height: 1.4),
            ),
          ],
        ),
      ),
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({required this.text, this.warning = false});

  final String text;
  final bool warning;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: warning ? const Color(0xFFF8E5DE) : const Color(0xFFEEF0E9),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
        child: Text(
          text,
          style: TextStyle(
            color: warning ? const Color(0xFFB4543F) : const Color(0xFF6D756F),
            fontSize: 12,
            fontWeight: FontWeight.w800,
          ),
        ),
      ),
    );
  }
}

class _MessageState extends StatelessWidget {
  const _MessageState({
    required this.icon,
    required this.title,
    required this.detail,
    required this.actionLabel,
    required this.onAction,
  });

  final IconData icon;
  final String title;
  final String detail;
  final String actionLabel;
  final VoidCallback onAction;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(28),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 46, color: const Color(0xFF2F6F73)),
          const SizedBox(height: 14),
          Text(
            title,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w900,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            detail,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Color(0xFF6D756F), height: 1.4),
          ),
          const SizedBox(height: 18),
          FilledButton(onPressed: onAction, child: Text(actionLabel)),
        ],
      ),
    );
  }
}

String _labelOf(String value) {
  return switch (value) {
    'spring' => 'Spring',
    'summer' => 'Summer',
    'autumn' => 'Autumn',
    'winter' => 'Winter',
    'work' => 'Work',
    'casual' => 'Casual',
    'party' => 'Party',
    'sport' => 'Sport',
    _ => value.isEmpty ? 'Not Set' : value,
  };
}

String _formatMoney(double? value) {
  if (value == null) {
    return '';
  }
  return '¥${value.toStringAsFixed(2)}';
}

String _formatDate(String value) {
  if (value.trim().isEmpty) {
    return '';
  }
  return value.replaceFirst('T', ' ').split('.').first;
}

String _favoriteLevel(int score) {
  if (score >= 80) {
    return 'Favorite';
  }
  if (score >= 45) {
    return 'Frequently Worn';
  }
  if (score >= 15) {
    return 'Occasionally Worn';
  }
  return 'Getting Started';
}
